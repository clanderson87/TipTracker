import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import TipReducer from './TipReducer';

export default combineReducers({
  auth: AuthReducer,
  searchObj: SearchReducer,
  tip: TipReducer
})