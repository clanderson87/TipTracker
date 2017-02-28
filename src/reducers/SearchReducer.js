import { ENABLE_SEARCH, CHOOSE_RESTAURANT, CLEAR_RESTAURANT_SELECTION } from '../actions/types';
const INITIAL_STATE = { search: false };

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ENABLE_SEARCH:
      return { ...state, search: true }
    case CHOOSE_RESTAURANT:
      console.log(action.payload);
      return { ...state, restaurant: action.payload }
    case CLEAR_RESTAURANT_SELECTION:
      return { ...state, restaurant: undefined }
    default:
      return state;
  };
};