import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../actions/types';
const INITIAL_STATE = { 
  email: '', 
  password: '', 
  user: null, 
  error: '', 
  loading: false,
  failed: false
};

let failCount = 0

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case EMAIL_CHANGED:
      return { ...state, email: payload }; //es6 spread operator
    case PASSWORD_CHANGED:
      return { ...state, password: payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: payload, error: '' };
    case LOGIN_USER_FAIL:
      console.log("failCount is ", failCount);
      failCount++;
      if (failCount > 3){
        return { ...state, error: "Authentication failed :(", password: '', failed: true}
      }
      return { ...state, error: "Authentication failed :(", password: ''}

    default:
      return state;
  }
};