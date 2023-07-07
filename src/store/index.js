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
