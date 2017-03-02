import firebase from 'firebase';
import { ENABLE_SEARCH, 
  CHOOSE_RESTAURANT, 
  CLEAR_RESTAURANT_SELECTION, 
  ADD_RESTAURANT,
  RESTAURANT_ADD_FAILED,
  RESTAURANT_SUCCESSFULLY_ADDED, 
  INITIAL_RESTAURANTS_AQUIRED,
  INITIAL_RESTAURANTS_FAILED
} from '../actions/types';

const INITIAL_STATE = { search: false, error: ''};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case INITIAL_RESTAURANTS_AQUIRED:
      return { ...state, myRestaurants: action.payload || {name: 'Sample Restaurant', gId: '000001'}}
    case INITIAL_RESTAURANTS_FAILED:
      return { ...state, error: '' }
    case ENABLE_SEARCH:
      return { ...state, search: true }
    case CHOOSE_RESTAURANT:
      return { ...state, search: false, restaurant: action.payload }
    case CLEAR_RESTAURANT_SELECTION:
      return { ...state, restaurant: undefined }
    case RESTAURANT_SUCCESSFULLY_ADDED:
      return { ...state, restaurant: undefined, search: '' }
    case RESTAURANT_ADD_FAILED:
      return { ...state, error: action.payload }
    default:
      return state;
  };
};