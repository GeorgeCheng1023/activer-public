import { configureStore } from '@reduxjs/toolkit';
import searchPanelReducer from './searchPanel/searchPanelSlice';

export default configureStore({
  reducer: {
    searchPane: searchPanelReducer,
  },
});
