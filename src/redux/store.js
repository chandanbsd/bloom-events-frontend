import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { backendApi } from "./backendApi";
import userReducer from "./user";
import eventReducer from "./event";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "event/clearEvent") {
    storage.removeItem("persist:root");
    state = {};
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// export default store = configureStore({
//   reducer: {
//     user: userReducer,
//     [backendApi.reducerPath]: backendApi.reducer,
//     persistedReducer: persistedReducer,
//   },
// });
