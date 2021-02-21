import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

import { apiCallBegan } from "./api";

import { urls } from '../utils/config/url';
import { TIME_CACHE_API_NOTIFICATION } from '../utils/config/refetchTime';

const slice = createSlice({

  name: 'notifiData',
  initialState: {
    list: [],
    loading: true,
    error: false,
    lastFetch: null
  },

  reducers: {
    notifiDataRequested: (notifiData, action) => {
      notifiData.loading = true;
    },

    notifiDataRequestFailed: (notifiData, action) => {
      notifiData.error = true;
    },

    notifiDataReceived: (notifiData, action) => {
      notifiData.list = action.payload;
      notifiData.loading = false;
      notifiData.lastFetch = Date.now();
    }
  }
});

export const { notifiDataRequested, notifiDataRequestFailed, notifiDataReceived } = slice.actions;
export default slice.reducer;

//Action Creator
const url = urls.notifiData;
export const fetchnotifiData = () => (dispatch, getState) => {

  const { lastFetch } = getState().notifiData;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

  if (diffInMinutes < TIME_CACHE_API_NOTIFICATION) return;

  dispatch(apiCallBegan({
    url,
    onStart: notifiDataRequested.type,
    onSuccess: notifiDataReceived.type,
    onError: notifiDataRequestFailed.type,
  })
  );
};
