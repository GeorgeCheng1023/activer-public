import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { apiUserGoogleData, apiUserLogin } from 'api/axios';

interface UserState {
  IsLoggedIn: boolean,
  Id: number,
  RealName: string,
  NickName: string,
  Email: string,
  Password: string,
  Portrait: string,
  Gender: string,
  Birthday: string,
  Profession: string,
  Phone: string,
  Country: string,
  Area: string,
  ActivityHistory: Array<number>,
  TagHistory: Array<number>,
  Status: number;
  Loading: 'idle' | 'loading' | 'succeeded' | 'failed',
  SessionToken: string, // auth
}

const initialState: UserState = {
  IsLoggedIn: false,
  Id: 0,
  RealName: '',
  NickName: '',
  Email: '',
  Password: '',
  Portrait: '',
  Gender: '',
  Birthday: '',
  Profession: '',
  Phone: '',
  Country: '',
  Area: '',
  ActivityHistory: [],
  TagHistory: [],
  Status: 0, // 0 | 1
  Loading: 'idle',
  SessionToken: '',
};

interface userLoginType {
  email: string,
  password: string,
}

export const userLogin = createAsyncThunk('auth/userLogin', async (userData: userLoginType) => {
  const response = await apiUserLogin(userData);
  // eslint-disable-next-line no-console
  console.log(response);
  return response;
});

export const getUserGoogleData = createAsyncThunk('auth/getUserGoogleData', async (accessToken: string) => {
  const response = await apiUserGoogleData(accessToken);
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
    userUpdate: (state, action: PayloadAction<any>) => {
      const userData = action.payload;
      return ({
        ...state,
        ...userData,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => ({
        ...state,
        Loading: 'loading',
      }))
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        const { Status } = action.payload.data;
        if (!Status) {
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
        console.log(userData);
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

export const { userLogout, userUpdate } = userAuthSlice.actions;

export default userAuthSlice.reducer;
