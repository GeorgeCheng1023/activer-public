import { configureStore } from '@reduxjs/toolkit';
import searchPanelReducer from './searchPanel';
import loginReducer from './Login';

const store = configureStore({
  reducer: {
    searchPanel: searchPanelReducer,
    login: loginReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
