import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_NEEDS_NEW_PASS,
  CREATE_NEW_USER
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

export const loginUser = ({ email, password, failed = null }) => {
  return (dispatch) => {
    
    const logUserFail = (msg=null) => {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: msg
      });
    };

    if(failed){
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => 
          dispatch({ 
            type: LOGIN_USER_NEEDS_NEW_PASS
          }))
        .catch(
          (err) => {
            if(err.code === "auth/user-not-found"){
              dispatch({
                type: CREATE_NEW_USER
              });
            }
            else {
              logUserFail(err.message);
            };
          }
        )
    }
    else {
      const logUserSuccess = user => {
        dispatch({ 
          type: LOGIN_USER_SUCCESS, 
          payload: user
        });
        Actions.main();
      }

      dispatch({ type: LOGIN_USER })

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => logUserSuccess(user))
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => logUserSuccess(user))
            .catch((err) => logUserFail(err.message));
        })
    }
  };
};