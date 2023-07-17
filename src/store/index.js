import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import auth from "./auth";
import teamsSlice from "./teamsSlice";
import matchesSlice from "./matchesSlice";
import leaguesSlice from "./leaguesSlice";
import playersSlice from "./playersSlice";
import categoriesSlice from "./categoriesSlice";
import joinRequestSlice from "./joinRequestSlice";
import announcementsSlice from "./announcementsSlice";
import actionSlice from "./actionSlice";
import scorekeeperSlice from './scorekeeperSlice';
import requestSlice from "./requestSlice";
import postSlice from "./postSlice";

const store = configureStore({
   middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
   reducer: {
      auth,
      teams: teamsSlice,
      matches: matchesSlice,
      leagues: leaguesSlice,
      players: playersSlice,
      categories: categoriesSlice,
      joinRequests: joinRequestSlice,
      announcements: announcementsSlice,
      actions: actionSlice,
      scorekeepers: scorekeeperSlice,
      requests: requestSlice,
      posts: postSlice
   }
});

export default store;
export * from "./auth";
export * from "./teamsSlice";
export * from "./matchesSlice";
export * from "./leaguesSlice";
export * from "./playersSlice";
export * from "./categoriesSlice";
export * from './joinRequestSlice';
export * from "./announcementsSlice";
export * from "./actionSlice";
export * from './scorekeeperSlice';
export * from './requestSlice';
export * from './postSlice';
