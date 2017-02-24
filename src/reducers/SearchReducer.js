import { ENABLE_SEARCH, CHOOSE_RESTAURANT } from '../actions/types';
const INITIAL_STATE = { search: false };

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ENABLE_SEARCH:
      return { ...state, search: true }
    case CHOOSE_RESTAURANT:
      console.log(action.payload);
      return { ...state, restaurant: action.payload }
    default:
      return state;
  };
};