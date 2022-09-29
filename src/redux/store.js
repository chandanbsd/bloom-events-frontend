import { configureStore } from "@reduxjs/toolkit";
import { backendApi } from "./backendApi";
import userReducer from "./user";

export default configureStore({
  reducer: {
    user: userReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
});
