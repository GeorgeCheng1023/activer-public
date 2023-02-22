import { configureStore } from '@reduxjs/toolkit';
import searchPanelReducer from './searchPanel';
import loadingReducer from './loading';
import userReducer from './user';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    searchPanel: searchPanelReducer,
    Loading: loadingReducer,
    user: userReducer,
    auth: authReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
