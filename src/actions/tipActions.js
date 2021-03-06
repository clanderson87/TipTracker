import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  GET_INITIAL,
  RESTAURANTS_AQUIRED,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  DELETE_TIP,
  TIP_SELECTED,
  TIP_UNSELECTED,
  EDIT_TIP,
  TIP_SHIFT_CHANGED,
  TIP_AMOUNT_CHANGED,
  TIP_DATE_CHANGED,
  TIP_RESTAURANT_CHANGED
} from './types';
import { dayOfWeek } from '../common/dateHelpers';

//private methods

const getUsersProjected = (provided) => {
  //fill this in later...
}

const sanitizeShift = (shift) => {
  switch(shift){
    case 'Breakfast':
      return '07:30:00';
    case 'Brunch':
      return '10:15:00';
    case 'Lunch':
      return '12:00:00';
    case 'Happy Hour':
      return '15:30:00';
    case 'Dinner':
      return '18:30:00';
    case 'Late Night':
      return '22:30:00';
  }
}

const sanitizeDate = (date, shift) => {
  if(typeof(date) !== 'string'){
    date = (new Date(date).toLocaleDateString());
  };
  return (new Date(`${date} `+`${sanitizeShift(shift)}`).getTime());
}


const generatePayload = (provided = null, message = null) => {
  const starterTip = {
    amount: 100,
    date: Date.now().toLocaleString,
    restaurant: "YumYum's Deli!",
    shift: 'Lunch',
    uuid: firebase.auth().currentUser.uid
  }
  let payload;

  if(provided === null){
    payload = {
      message: "Let's start by adding some tips!",
      avg: 0,
      tips: [starterTip]
    }
  } else {
    const providedArr = Object.values(provided);
    let total = providedArr.reduce((totes, val) => {
      return totes += val.amount;
    }, 0);

    payload = { 
      message,
      avg: Math.round(total/providedArr.length),
      tips: providedArr
    };
  }
  return payload;
};

//exported

export const getRestaurants = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/restaurants`)
      .once('value', (snapshot) => {
        let payload = Object.values(snapshot.val());
        dispatch({
          type: RESTAURANTS_AQUIRED,
          payload
        });
      }
    );
  };
};

export const getInitial = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref('tips/')
      .orderByChild('uuid').limitToLast(10).equalTo(currentUser.uid)
      .on('value', (snapshot) => {
            payload = generatePayload(snapshot.val());
            //Add logic to extract usersAverage, usersProjected, and usersRestaurants here. Add them to payload.
            dispatch({
              type: GET_INITIAL,
              payload
            });
        });
  };
};

export const addTip = (amount, date, restaurant, shift) => {
  const tipRef = firebase.database().ref('tips').push();
  tip = {
    restaurant,
    shift,
    amount: parseInt(amount),
    date: sanitizeDate(date, shift),
    uuid: firebase.auth().currentUser.uid,
    tId: tipRef.key,
    added: new Date().getTime(),
    weekday: dayOfWeek(date.getDay())
    //methods to add server side:
      //weather
      //events
      //cuisene type
  };

  return (dispatch) => {
    const successAddAction = (tip) => {
      dispatch({
        payload,
        type: ADD_TIP_SUCCESS
      });
      Actions.tipsDashboard({ type: 'reset' });
    };

    const failAddAction = (err) => {
      dispatch({
        payload,
        type: ADD_TIP_FAIL
      });
    };
    firebase.database().ref('tips/')
      .push(tip)
        .then(tip => successAddAction(tip))
        .catch(err =>failAddAction(err));
  };
};

export const deleteTip = ({ tId }) => {
  return (dispatch) => {
    const QueryLoc = firebase.database().ref('tips')
    QueryLoc.orderByChild('tId').equalTo(tId).on('child_added', (snapshot) => {
      snapshot.ref.remove()
        .then(() => dispatch({
            type: DELETE_TIP,
            payload: {
              message: 'tip deleted successfully!'
            }
          }),
          Actions.tipsDashboard({ type: 'reset' })
        )
        .catch(err => dispatch({
            type: DELETE_TIP,
            payload: {
              message: err
            }
          }),
          Actions.tipsDashboard({ type: 'reset' })
        )
      })
  }
}

export const selectTip = (tip) => {
  console.log('selectedTip is ', tip);
  let d = new Date(tip.date);
  tip.date = d;

  return {
    type: TIP_SELECTED,
    payload: tip
  };
};

export const unselectTip = () => {
  return {
    type: TIP_UNSELECTED,
    payload: {}
  };
};

export const editTip = (tip) => {
  console.log('editTip.tip is ', tip);

  return (dispatch) => {
    const QueryLoc = firebase.database().ref('tips');
    QueryLoc.orderByChild('tId').equalTo(tip.tId).on('child_added', snapshot => {
      const oldTip = snapshot.val();
      const loc = snapshot.ref;
      loc.set({ ...oldTip,
        amount: parseInt(tip.amount),
        date: sanitizeDate(tip.date, tip.shift),
        restaurant: tip.restaurant,
        shift: tip.shift,
        lastUpdated: new Date().getTime()
      })
      .then(() => dispatch({
        type: TIP_UNSELECTED,
        payload: {
          message: 'tip edited successfully!'
        }}),
        Actions.tipsDashboard({ type: 'reset' })
      );
    });
  };
};

export const tipShiftChanged = (shift) => {
  return {
    type: TIP_SHIFT_CHANGED,
    payload: shift
  };
};

export const tipAmountChanged = (amount) => {
  let acceptable='0123456789.$'
  let payload = { amount, message: '' };
  
  amount.split('').forEach(char => {
    if(!acceptable.includes(char)){
        payload.message = 'Please only use numbers and \'.\' when inputting tips!'
        payload.amount = '';
      };
    })

  return {
    type: TIP_AMOUNT_CHANGED,
    payload
  }
};

export const tipDateChanged = (date) => {
  const splitDate = date.split('/');
  const d = new Date(splitDate[0], (splitDate [1] - 1), splitDate[2]);

  return {
    type: TIP_DATE_CHANGED,
    payload: d
  };
};

export const tipRestuarantChanged = (rest) => {
  return {
    type: TIP_RESTAURANT_CHANGED,
    payload: rest
  };
};