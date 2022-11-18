import { createSlice } from '@reduxjs/toolkit';

export const searchPanelSlice = createSlice({
  name: 'searchPanel',
  initialState: {
    display: true,
  },
  reducers: {
    display: (state) => ({
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
export const { display, hide, toggle } = searchPanelSlice.actions;
// export value
export const selectDisplay = (state) => state.searchPanel.value;

export default searchPanelSlice.reducer;
