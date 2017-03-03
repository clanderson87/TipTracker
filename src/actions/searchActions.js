import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  ENABLE_SEARCH, 
  CHOOSE_RESTAURANT, 
  CLEAR_RESTAURANT_SELECTION, 
  ADD_RESTAURANT,
  RESTAURANT_ADD_FAILED,
  RESTAURANT_SUCCESSFULLY_ADDED,
  INITIAL_RESTAURANTS_AQUIRED,
  INITIAL_RESTAURANTS_FAILED
} from './types';



export const getInitialRestaurants = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    
    firebase.database().ref(`users/${currentUser.uid}/restaurants`)
      .on('value', (snapshot) => {
            console.log("snapshot is ", snapshot.val());
            dispatch({
              type: INITIAL_RESTAURANTS_AQUIRED,
              payload: snapshot.val()
            })
        }
      )
  }
}

export const enableSearch = () => {
  return {
    type: ENABLE_SEARCH
  };
};

export const chooseRestaurant = restaurant => {
  return {
    type: CHOOSE_RESTAURANT,
    payload: restaurant
  }
}

export const clearRestaurantSelection = () => {
  return {
    type: CLEAR_RESTAURANT_SELECTION
  }
}

export const addRestaurant = restaurant => {
  const { currentUser } = firebase.auth();
  const { gId, name } = restaurant;
  const fbRef = firebase.database();

  return (dispatch) => {
    const successAddAction = (rest) => {
      dispatch({
        type: RESTAURANT_SUCCESSFULLY_ADDED,
        payload: rest
      })
    }

    const failAddAction = (err) => {
      dispatch({
        type: RESTAURANT_ADD_FAILED,
        payload: err
      })
    }

    fbRef.ref(`users/${currentUser.uid}/restaurants`) //adding to user's restaurants
      .push({gId, name})
        .then(
          successAddAction(restaurant)
        )
        .catch(err => failAddAction(err));
  }
}

export const deleteRestaurant = restaurant => {
  const { currentUser } = firebase.auth();
  const toDelete = 
    firebase.database().ref(`users/${currentUser.uid}/restaurants`)
      .orderByChild('gId').equalTo(`${restaurant.gId}`).once('value').then(snapshot => console.log(snapshot.val()));
  
  console.log(toDelete);
  
  

  // toDelete.remove()
  //   .then(() => {
  //     console.log("Remove succeeded.")
  //   })
  //   .catch((err) => {
  //     console.log("Remove failed: " + err.message)
  //   });;
}