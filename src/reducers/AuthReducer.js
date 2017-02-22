import { EMAIL_CHANGED } from '../actions/types';
const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }; //es6 spread operator
    default:
      return state;
  }
};