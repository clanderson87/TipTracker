import { 
  GET_INITIAL,
  RESTAURANTS_AQUIRED,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  SHOW_DATE_PICKER,
  CANCEL_DATE_PICKER,
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
  datePicker: false,
  message: '',
  tipAmount: null,
  tipDate: new Date(),
  tipShift: "Lunch",
  tipRestaurant: ''
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case GET_INITIAL:
      return { ...state, usersTips: payload.tips, usersAverage: payload.avg };
    case RESTAURANTS_AQUIRED:
      return { ...state, usersRestaurants: payload, tipRestaurant: payload[0].gId }
    case ADD_TIP_SUCCESS:
      return { ...state, datePicker: false, message: payload.message };
    case ADD_TIP_FAIL:
      return { ...state, message: payload.message };
    case SHOW_DATE_PICKER:
      return { ...state, datePicker: true };
    case CANCEL_DATE_PICKER:
      return { ...state, datePicker: false };
    case TIP_SHIFT_CHANGED:
      return { ...state, tipShift: payload };
    case TIP_RESTAURANT_CHANGED:
      return { ...state, tipRestaurant: payload };
    case TIP_DATE_CHANGED:
      return { ...state, tipDate: payload };
    case TIP_AMOUNT_CHANGED:
      return { ...state, tipAmount: payload.amount, message: payload.message };
    default:
      return state;
  }
}