import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';

export interface LoadingStateType {
  loading: LoadingType,
}

type LoadingType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: LoadingStateType = {
  loading: 'idle',
};

const loadingSlice = createSlice({
  name: 'Loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingType>) => ({
      ...state,
      loading: action.payload,
    }),
  },
});

export const getLoadingState = (state: RootState) => state.Loading.loading;

export const {
  setLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;
