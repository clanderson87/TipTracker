import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  GET_INITIAL,
  RESTAURANTS_AQUIRED,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  SHOW_DATE_PICKER,
  CANCEL_DATE_PICKER,
  TIP_SHIFT_CHANGED,
  TIP_AMOUNT_CHANGED,
  TIP_DATE_CHANGED,
  TIP_RESTAURANT_CHANGED
} from './types';

//private methods

const getUsersProjected = (provided) => {
  //fill this in later...
}

const generatePayload = (provided, message = null) => {
  const providedArr = Object.values(provided);
  let total = providedArr.reduce((totes, val) => {
    return totes += val.amount;
  }, 0);
  return { 
    message,
    avg: total/providedArr.length,
    tips: providedArr
  };
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
  tip = {
    amount,
    date,
    restaurant,
    shift
  };
  tip.uuid = firebase.auth().currentUser.uid;
  
  return (dispatch) => {
    const successAddAction = (tip) => {
      dispatch({
        payload,
        type: ADD_TIP_SUCCESS
      });
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

export const showDatePicker= () => {
  return {
    type: SHOW_DATE_PICKER
  };
};

export const cancelDatePicker = () => {
  return {
    type: CANCEL_DATE_PICKER
  };
};

export const tipShiftChanged = (shift) => {
  return {
    type: TIP_SHIFT_CHANGED,
    payload: shift
  };
};

export const tipAmountChanged = (amount) => {
  return {
    type: TIP_AMOUNT_CHANGED,
    payload: amount
  };
};

export const tipDateChanged = (date) => {
  return {
    type: TIP_DATE_CHANGED,
    payload: date
  };
};

export const tipRestuarantChanged = (rest) => {
  return {
    type: TIP_RESTAURANT_CHANGED,
    payload: rest
  };
};