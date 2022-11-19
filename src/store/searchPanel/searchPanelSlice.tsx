import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store';

interface SearchPanelState {
  display: boolean;
}

const initialState: SearchPanelState = {
  display: true,
};

export const searchPanelSlice = createSlice({
  name: 'searchPanel',
  initialState,
  reducers: {
    show: (state) => ({
      ...state,
      display: true,
    }),
    hide: (state) => ({
      ...state,
      display: false,
    }),
    toggle: (state) => ({
      ...state,
      display: !state.display,
    }),
  },
});
// export actions
export const { show, hide, toggle } = searchPanelSlice.actions;
// export value
export const selectDisplay = (state: RootState) => state.searchPanel.display;

export default searchPanelSlice.reducer;
