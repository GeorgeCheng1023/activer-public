import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import type { TagType } from 'components/Tag';

interface SearchPanelState {
  display: boolean;
  defaultTags: TagType[],
  sortTags: TagType[],
  recommendTags: TagType[],
}

const initialState: SearchPanelState = {
  display: false,
  defaultTags: [],
  sortTags: [],
  recommendTags: [],
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
    setSortTag: (state, action: PayloadAction<TagType[]>) => ({
      ...state,
      sortTags: action.payload,
    }),
  },
});
// export actions
export const {
  show, hide, toggle, setSortTag,
} = searchPanelSlice.actions;
// export value
export const selectDisplay = (state: RootState) => state.searchPanel.display;
export const defaultTags = (state: RootState) => state.searchPanel.defaultTags;
export const sortTags = (state: RootState) => state.searchPanel.sortTags;
export const recommendTags = (state: RootState) => state.searchPanel.recommendTags;

export default searchPanelSlice.reducer;
