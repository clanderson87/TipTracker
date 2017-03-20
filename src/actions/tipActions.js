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

const getUsersAverage = (provided) => {
  let total = provided.tips.reduce((total, { amount }) =>{
    return total += amount;
  }, 0);
  return total/provided.tips.length;
};

export const getInitial = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/tips`)
      .orderByChild('amount').limitToLast(10)
      .on('child_added', (snapshot) => {
            console.log('snapshot is ', snapshot.val());
            let payload = {};
            //payload.tips = getUsersAverage(snapshot.val(). ...etc);
            //Add logic to extract usersAverage, usersProjected, and usersRestaurants here. Add them to payload.
            dispatch({
              type: GET_INITIAL,
              payload: snapshot.val() //replace this with the payload object once it has been constructed.
            });
        }
      );
  };
};

export const addTip = (tip) => {
  const { currentUser } = firebase.auth();
  let payload = {};
  return (dispatch) => {

    const successAddAction = (tip) => {
      payload = tip;
      dispatch({
        payload,
        type: ADD_TIP_SUCCESS
      });
    };

    const failAddAction = (err) => {
      payload.message = err;
      dispatch({
        payload,
        type: ADD_TIP_FAIL
      })
    };

    firebase.database().ref(`users/${currentUser.uid}/tips`)
      .push(tip)
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