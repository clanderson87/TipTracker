import { ENABLE_SEARCH } from '../actions/types';
const INITIAL_STATE = { search: false };

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ENABLE_SEARCH:
      console.log("Enabled Search!")
      return { ...state, search: true }
    default:
      return state;
  };
};