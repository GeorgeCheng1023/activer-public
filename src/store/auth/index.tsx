import {
  createSlice,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';

interface authSliceType {
  isLoggedIn: boolean,
}

const initialState: authSliceType = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => ({
      ...state,
      isLoggedIn: true,
    }),
    signOut: (state) => ({
      ...state,
      isLoggedIn: true,
    }),
  },

});

export const getUserIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
