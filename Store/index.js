import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { userAuth } from "./userAuth";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? true
  : false;

const theme = createSlice({
  name: "darkMode",
  initialState: { darkMode: darkMode },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    theme: theme.reducer,
    userAuth: userAuth.reducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const themeActions = theme.actions;
export const persistor = persistStore(store);
export default store;
