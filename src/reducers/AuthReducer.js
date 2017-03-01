import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_NEEDS_NEW_PASS,
  CREATE_NEW_USER
} from '../actions/types';
const INITIAL_STATE = { 
  email: 'test@test.com', //FOR DEV PURPOSES ONLY TAKE THIS OUT
  password: 'password', // LIKEWISE
  user: null, 
  error: '', 
  loading: false,
  failed: false,
  message: ''
};

let failCount = 0

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  console.log("Action is ", action);
  switch (type) {
    case EMAIL_CHANGED:
      return { ...state, email: payload };
    case PASSWORD_CHANGED:
      return { ...state, password: payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: ''};
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: payload };
    case LOGIN_USER_FAIL:
      failCount++;
      let errMsg = payload || "Authentication Failed :("
      if (failCount > 3){
        return { ...state, error: errMsg, password: '', failed: true, loading: false}
      }
      return { ...state, error: errMsg, password: '', loading: false}
    case LOGIN_USER_NEEDS_NEW_PASS:
      failCount = 0;
      return { ...state, ...INITIAL_STATE }
    case CREATE_NEW_USER:
      failCount = 0;
      return { ...INITIAL_STATE, email: state.email }
    default:
      return state;
  }
};