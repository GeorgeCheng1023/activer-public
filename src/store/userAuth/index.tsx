import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { apiUserGoogleData, apiUserLogin } from 'api/axios';

const initialState: UserState = {
  IsLoggedIn: false,
  Loading: 'idle',
  Status: '',
  RealName: '',
  NickName: '',
  Portrait: '',
  Email: '',
  Password: '',
  Gender: '',
  Birthday: '',
  Profession: '',
  Phone: '',
  County: '',
  Area: '',
  ActivityHistory: [],
  TagHistory: [],
  SessionToken: '',
};

export const userLogin = createAsyncThunk('auth/userLogin', async (userData: userLogin) => {
  const response = await apiUserLogin(userData);
  return response;
});

export const getUserGoogleData = createAsyncThunk('auth/getUserGoogleData', async (accessToken: string) => {
  const response = await apiUserGoogleData(accessToken);
  return response;
});

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => ({
      ...state,
      IsLoggedIn: false,
      Id: 0,
      RealName: '',
      Status: '0',
      Loading: 'idle',
      SessionToken: '',
    }),
    userUpdate: (state, action: PayloadAction<any>) => ({
      ...state,
      ...action.payload,
      IsLoggedIn: true,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => ({
        ...state,
        Loading: 'loading',
      }))
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        const { Status } = action.payload.data;
        if (Status === 0) {
          return ({
            ...state,
            IsLoggedIn: false,
            Loading: 'failed',
            Status,
          });
        }
        const { User, SessionToken } = action.payload.data;
        return ({
          ...state,
          IsLoggedIn: true,
          Loading: 'succeeded',
          Email: User.Email,
          Id: User.Id,
          Status,
          SessionToken,
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log('error status: ', action.error.message?.split(' ')[5]);
        const errorStatus = action.error.message?.split(' ')[5];
        return ({
          ...state,
          Status: errorStatus,
          Loading: 'failed',
        });
      })

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
      });
  },
});

export const getUserIsLoggedIn = (state: RootState) => state.userAuth.IsLoggedIn;
export const getLoadingState = (state: RootState) => state.userAuth.Loading;
export const getUserRealname = (state: RootState) => state.userAuth.RealName;
export const getUserData = (state: RootState) => state.userAuth;

export const { userLogout, userUpdate } = userAuthSlice.actions;

export default userAuthSlice.reducer;
