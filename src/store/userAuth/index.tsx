import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { apiUserAuth, apiUserGoogleData } from 'api/user';

interface UserState {
  IsLoggedIn: boolean,
  realName: string,
  id: number,
  nickName: string,
  email: string,
  verify: boolean,
  avatar: string,
  gender: string,
  birthday: string,
  profession: string,
  phone: string,
  county: string,
  area: string,
  activityHistory: Array<number>,
  tagHistory: Array<number>,
  Loading: 'idle' | 'loading' | 'succeeded' | 'failed',
}

const initialState: UserState = {
  IsLoggedIn: false,
  Loading: 'idle',
  id: 0,
  // userinfo
  realName: '',
  nickName: '',
  avatar: '',
  email: '',
  verify: false,
  gender: '',
  birthday: '',
  profession: '',
  phone: '',
  county: '',
  area: '',
  activityHistory: [],
  tagHistory: [],
};

export const getUserGoogleData = createAsyncThunk('auth/getUserGoogleData', async (accessToken: string) => {
  const response = await apiUserGoogleData(accessToken);
  return response;
});

export const asyncGetUserData = createAsyncThunk('auth/getUserData', async (sessionToken: string) => {
  const response = await apiUserAuth(sessionToken);
  return response;
});

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRealName: (state, action: PayloadAction<any>) => ({
      ...state,
      realName: action.payload,
    }),
    setEmail: (state, action: PayloadAction<any>) => ({
      ...state,
      email: action.payload,
    }),
    setBirthday: (state, action: PayloadAction<any>) => ({
      ...state,
      birthday: action.payload,
    }),
    setAvatar: (state, action: PayloadAction<any>) => ({
      ...state,
      avatar: action.payload,
    }),
    userLogin: (state, action: PayloadAction<any>) => ({
      ...state,
      IsLoggedIn: true,
      Loading: 'succeeded',
      ...action.payload,
    }),
    userLogout: (state) => ({
      ...state,
      IsLoggedIn: false,
      Id: 0,
      Loading: 'idle',
      accessToken: '',
    }),
    userUpdate: (state, action: PayloadAction<any>) => ({
      ...state,
      IsLoggedIn: true,
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGoogleData.fulfilled, (state, action) => {
        const userData = action.payload.data;
        return ({
          ...state,
          IsLoggedIn: true,
          RealName: userData.name,
          Portrait: userData.picture,
          Email: userData.email,
          Loading: 'succeeded',
        });
      })
      .addCase(asyncGetUserData.fulfilled, (state) => ({
        ...state,
      }));
  },
});
export const getUserId = (state: RootState) => state.userAuth.id;
export const getUserIsLoggedIn = (state: RootState) => state.userAuth.IsLoggedIn;
export const getLoadingState = (state: RootState) => state.userAuth.Loading;
export const getUserRealname = (state: RootState) => state.userAuth.RealName;
export const getUserPortrait = (state: RootState): string => state.userAuth.Portrait;
export const getUserData = (state: RootState) => state.userAuth;
export const getUserNickname = (state: RootState) => state.userAuth.Nickname;

export const {
  setRealName, setEmail, setBirthday, userLogin, setAvatar, userLogout, userUpdate,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
