import { configureStore } from '@reduxjs/toolkit';
import searchPanelReducer from './searchPanel';

const store = configureStore({
  reducer: {
    searchPanel: searchPanelReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
