import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {userReducer} from './user'
import {moviesReducer} from './movies'



const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    users: userReducer,
    movies:moviesReducer,
  },
});

export default store;
