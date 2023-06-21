import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import teamSlice from './teamsSlice';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth,
    teams: teamSlice
  }
});

export default store;
export * from './auth';

