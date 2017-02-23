import { ENABLE_SEARCH } from '../actions/types';
const INITIAL_STATE = { srch: false };

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ENABLE_SEARCH:
      return { ...state, search: true }
    default:
      return state;
  };
};