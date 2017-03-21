import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  GET_INITIAL,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  ACTIVATE_FAB,
  CANCEL_FAB,
  TIP_SHIFT_CHANGED,
  TIP_AMOUNT_CHANGED,
  TIP_DATE_CHANGED,
  TIP_RESTAURANT_CHANGED
} from './types';

//private methods

const tipRef = firebase.database().ref('tips/');

const generatePayload = (provided, message = null) => {
  const providedArr = Object.values(provided);
  let usersRestaurants = [];
  let total = providedArr.reduce((totes, val) => {
    if(!usersRestaurants.includes(val.restaurant)){
      usersRestaurants.push(val.restaurant);
    };
    return totes += val.amount;
  }, 0);
  return { 
    usersRestaurants, 
    message,
    avg: total/providedArr.length,
    tips: providedArr
  };
};

//exported

export const getInitial = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    tipRef
      .orderByChild('uuid').limitToLast(10).equalTo(currentUser.uid)
      .on('value', (snapshot) => {
            console.log('snapshot is ', snapshot.val());
            payload = generatePayload(snapshot.val());
            console.log("new payload is ", payload)
            //Add logic to extract usersAverage, usersProjected, and usersRestaurants here. Add them to payload.
            dispatch({
              type: GET_INITIAL,
              payload
            });
        });
  };
};

export const addTip = (tip) => {
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

    tipRef.push(tip)
      .then(successAddAction(tip))
      .catch(failAddAction(err));
  };
};

export const activateFab = () => {
  return {
    type: ACTIVATE_FAB
  };
};

export const cancelFab = () => {
  return {
    type: CANCEL_FAB
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