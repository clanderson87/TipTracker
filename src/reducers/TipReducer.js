import { 
  GET_INITIAL,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  ACTIVATE_FAB,
  CANCEL_FAB,
  TIP_SHIFT_CHANGED,
  TIP_RESTAURANT_CHANGED,
  TIP_DATE_CHANGED,
  TIP_AMOUNT_CHANGED
} from '../actions/types';
const INITIAL_STATE = { 
  usersTips: [],
  usersAverage: null,
  usersProjected: null,
  usersRestaurants: [],
  addingModal: false,
  message: '',
  tipAmount: null,
  tipDate: null,
  tipShift: null,
  tipRestaurant: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case GET_INITIAL:
      return { ...state, usersTips: payload.tips, usersAverage: payload.avg };
    case ADD_TIP_SUCCESS:
      return { ...state, addingModal: false, message: payload.message };
    case ADD_TIP_FAIL:
      return { ...state, message: payload.message };
    case ACTIVATE_FAB:
      return { ...state, addingModal: true };
    case CANCEL_FAB:
      return { ...state, addingModal: false };
    case TIP_SHIFT_CHANGED:
      return { ...state, tipShift: payload };
    case TIP_RESTAURANT_CHANGED:
      return { ...state, tipRestaurant: payload };
    case TIP_DATE_CHANGED:
      return { ...state, tipDate: payload };
    case TIP_AMOUNT_CHANGED:
      return { ...state, tipAmount: payload };
    default:
      return state;
  }
}