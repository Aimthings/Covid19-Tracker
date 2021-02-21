import { combineReducers } from 'redux';

import covidDataReducer from './countryData';
import notifiReducer from './notifiData';

export default combineReducers({
  covidData: covidDataReducer,
  notifiData: notifiReducer
});
