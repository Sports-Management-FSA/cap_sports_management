import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import teamsSlice from './teamsSlice';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth,
    teams: teamsSlice,
  }
});

export default store;
export * from './auth';
export * from './teamsSlice';

