import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import teamsSlice from './teamsSlice';
import leaguesSlice from "./leaguesSlice";

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth,
    teams: teamsSlice,
    leagues: leaguesSlice
  }
});

export default store;
export * from './auth';
export * from './teamsSlice';
export * from './leaguesSlice';

