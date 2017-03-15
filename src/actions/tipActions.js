import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  GET_INITIAL,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  ACTIVATE_FAB,
  CANCEL_FAB
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
              payload: snapshot.val() //replace this with let payload once payload is constructed.
            });
        }
      );
  };
};

export const addTip = (tip) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/tips`)
      .push(tip)
        .then
  };
};