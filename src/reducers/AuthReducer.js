import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types';
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
    case LOGIN_USER:
      return { ...state, loading: true, error: ''};
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: payload };
    case LOGIN_USER_FAIL:
      failCount++;
      if (failCount > 3){
        return { ...state, error: "Authentication failed :(", password: '', failed: true, loading: false}
      }
      return { ...state, error: "Authentication failed :(", password: '', loading: false}

    default:
      return state;
  }
};