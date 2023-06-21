import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import teamsSlice from './teamsSlice';
import matchesSlice from "./matchesSlice";

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth,
    teams: teamsSlice,
    matches: matchesSlice
  }
});

export default store;
export * from './auth';
export * from './teamsSlice';
export * from './matchesSlice';

