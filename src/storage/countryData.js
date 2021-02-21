import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

import { apiCallBegan } from "./api";

import { urls } from '../utils/config/url';
import { TIME_CACHE_API_COVIDDATA } from '../utils/config/refetchTime';

const slice = createSlice({

  name: 'covidData',
  initialState: {
    list: [],
    loading: true,
    error: false,
    lastFetch: null
  },

  reducers: {
    countryDataRequested: (covidData, action) => {
      covidData.loading = true;
    },

    countryDataRequestFailed: (covidData, action) => {
      covidData.error = true;
    },

    countryDataReceived: (covidData, action) => {
      covidData.list = action.payload;
      covidData.loading = false;
      covidData.lastFetch = Date.now();
    }
  }
});

export const { countryDataRequested, countryDataRequestFailed, countryDataReceived } = slice.actions;
export default slice.reducer;

//Action Creator
const url = urls.countryData;
export const fetchCovidData = () => (dispatch, getState) => {

  const { lastFetch } = getState().covidData;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

  if (diffInMinutes < TIME_CACHE_API_COVIDDATA) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: countryDataRequested.type,
      onSuccess: countryDataReceived.type,
      onError: countryDataRequestFailed.type,
    })
  );
};

// //Selector
// export const getCovidData = state => state.covidData;
