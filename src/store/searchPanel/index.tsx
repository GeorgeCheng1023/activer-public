import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import type { TagType } from 'components/Tag';

interface SearchPanelState {
  display: boolean;
  keyword: string,
  defaultTags: TagType[],
  sortTags: TagType[],
  recommendTags: TagType[],
  storageTags: TagType[],
}

const initialState: SearchPanelState = {
  display: false,
  defaultTags: [],
  sortTags: [],
  recommendTags: [],
  storageTags: [],
  keyword: '',
};

export const searchPanelSlice = createSlice({
  name: 'searchPanel',
  initialState,
  reducers: {
    show: (state) => {
      document.body.style.overflow = 'hidden';
      return ({
        ...state,
        display: true,
      });
    },
    hide: (state) => {
      document.body.style.overflow = 'scroll';
      return ({
        ...state,
        display: false,
      });
    },
    toggle: (state) => ({
      ...state,
      display: !state.display,
    }),
    setSortTag: (state, action: PayloadAction<TagType[]>) => ({
      ...state,
      sortTags: action.payload,
    }),
    addStorage: (state, action: PayloadAction<TagType>) => {
      const newTag = action.payload;
      const newTagsRecommend = state.recommendTags.filter((tag) => tag.id !== action.payload.id);
      if (!(state.storageTags.map((tag) => tag.id).includes(action.payload.id))) {
        return ({
          ...state,
          storageTags: [...state.storageTags, newTag],
          recommendTags: newTagsRecommend,
          sortTags: [...state.sortTags, newTag],
        });
      }
      return ({
        ...state,
        recommendTags: newTagsRecommend,
      });
    },
    removeStorage: (state, action: PayloadAction<TagType>) => {
      const targetTag = action.payload;
      const newTagsStorage = state.storageTags.filter((tag) => tag.id !== targetTag.id);
      const newTagsSort = state.sortTags.filter((tag) => tag.id !== targetTag.id);
      // check if exist in recommend
      if (!(state.recommendTags.map((tag) => tag.id).includes(targetTag.id))) {
        return ({
          ...state,
          recommendTags: [...state.recommendTags, targetTag],
          storageTags: newTagsStorage,
          sortTags: newTagsSort,
        });
      }
      return ({
        ...state,
        storageTags: newTagsStorage,
        sortTags: newTagsSort,
      });
    },
    addHistoryTags: (state, action: PayloadAction<TagType[]>) => {
      const newTags = action.payload;
      return ({
        ...state,
        storageTags: newTags,
        sortTags: newTags,
      });
    },
    setKeyword: (state, action: PayloadAction<string>) => ({
      ...state,
      keyword: action.payload,
    }),

  },
});
// export actions
export const {
  show, hide, toggle, setSortTag, addStorage, removeStorage, addHistoryTags, setKeyword,
} = searchPanelSlice.actions;
// export selector
export const selectDisplay = (state: RootState) => state.searchPanel.display;
export const selectDefaultTags = (state: RootState) => state.searchPanel.defaultTags;
export const selectSortTags = (state: RootState) => state.searchPanel.sortTags;
export const selectStorageTags = (state: RootState) => state.searchPanel.storageTags;
export const selectRecommendTags = (state: RootState) => state.searchPanel.recommendTags;
export const selectKeyword = (state: RootState) => state.searchPanel.keyword;

// export reducer
export default searchPanelSlice.reducer;
