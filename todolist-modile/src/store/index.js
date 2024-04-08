import { configureStore, combineReducers } from "@reduxjs/toolkit";
import home from "./home";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const reduxStore = combineReducers({
  home: home,
});

// 持久化配置
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reduxStore);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// export default reduxStore;
