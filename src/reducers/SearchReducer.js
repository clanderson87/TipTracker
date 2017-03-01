import firebase from 'firebase';
import { ENABLE_SEARCH, 
  CHOOSE_RESTAURANT, 
  CLEAR_RESTAURANT_SELECTION, 
  ADD_RESTAURANT,
  RESTAURANT_ADD_FAILED,
  RESTAURANT_SUCCESSFULLY_ADDED
} from '../actions/types';


// const myRestaurants = () => {
//   const user = firebase.auth();
//   let myRests = [];
//   fairbase.database().ref(`users/${user}/restaurants`).once('value')
//     .then((snapshot) => {
//       myRests.push(snapshot.val());
//     })
//     return myRests
// }

const INITIAL_STATE = { search: false, error: '' };

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ENABLE_SEARCH:
      return { ...state, search: true }
    case CHOOSE_RESTAURANT:
      console.log(action.payload);
      return { ...state, restaurant: action.payload }
    case CLEAR_RESTAURANT_SELECTION:
      return { ...state, restaurant: undefined }
    // case ADD_RESTAURANT:
    //   return { ...INITIAL_STATE }
    case RESTAURANT_SUCCESSFULLY_ADDED:
      return { ...INITIAL_STATE }
    case RESTAURANT_ADD_FAILED:
      return { ...state, error: action.payload }
    default:
      return state;
  };
};