import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { apiUserGoogleData, apiUserLogin, apiUserUpdate } from 'api/axios';

const initialState: UserState = {
  IsLoggedIn: false,
  Loading: 'idle',
  Status: 0, // 0 | 1
  Id: 0,
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

interface userLoginType {
  email: string,
  password: string,
}

export const userLogin = createAsyncThunk('auth/userLogin', async (userData: userLoginType) => {
  const response = await apiUserLogin(userData);
  return response;
});

export const getUserGoogleData = createAsyncThunk('auth/getUserGoogleData', async (accessToken: string) => {
  const response = await apiUserGoogleData(accessToken);
  return response;
});

export const updateUserData = createAsyncThunk('auth/updateUserData', async (userData: UserState) => {
  const response = await apiUserUpdate(userData);
  console.log(response);
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
      Status: 0,
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
      .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => ({
        ...state,
        Loading: 'failed',
        Status: action.payload.Status,
      }))

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

      .addCase(updateUserData.pending, (state) => ({
        ...state,
        Loading: 'loading',
      }))
      .addCase(updateUserData.fulfilled, (state) => ({
        ...state,
        Loading: 'succeeded',
      }))
      .addCase(updateUserData.rejected, (state) => ({
        ...state,
        Loading: 'failed',
      }));
  },
});

export const getUserIsLoggedIn = (state: RootState) => state.userAuth.IsLoggedIn;
export const getLoadingState = (state: RootState) => state.userAuth.Loading;
export const getUserRealname = (state: RootState) => state.userAuth.RealName;
export const getUserData = (state: RootState) => state.userAuth;

export const { userLogout, userUpdate } = userAuthSlice.actions;

export default userAuthSlice.reducer;
