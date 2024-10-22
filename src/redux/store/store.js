import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/userSlice.js";
import { useUsers } from "../slices/Post_users";

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer.reducer,
    users: useUsers.reducer,
  }),
});
