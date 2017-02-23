import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ENABLE_SEARCH } from './types';

export const enableSearch = () => {
  console.log("Search is enabled!");
  return ({
    type: ENABLE_SEARCH
  });
};

