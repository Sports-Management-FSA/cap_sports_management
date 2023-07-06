import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import auth from "./auth";
import teamsSlice from "./teamsSlice";
import matchesSlice from "./matchesSlice";
import leaguesSlice from "./leaguesSlice";
import playersSlice from "./playersSlice";
import categoriesSlice from "./categoriesSlice";

const store = configureStore({
   middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
   reducer: {
      auth,
      teams: teamsSlice,
      matches: matchesSlice,
      leagues: leaguesSlice,
      players: playersSlice,
      categories: categoriesSlice,
   }
});

export default store;
export * from "./auth";
export * from "./teamsSlice";
export * from "./matchesSlice";
export * from "./leaguesSlice";
export * from "./playersSlice";
export * from "./categoriesSlice";
