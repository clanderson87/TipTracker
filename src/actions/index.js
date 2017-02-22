import firebase from 'firebase';
import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    const logUserSuccess = user => {
      dispatch({ 
        type: LOGIN_USER_SUCCESS, 
        payload: user 
      });
    }

    const logUserFail = user => {
      dispatch({
        type: LOGIN_USER_FAIL
      })
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => logUserSuccess(user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => logUserSuccess(user))
          .catch(() => logUserFail());
      })
  };
};