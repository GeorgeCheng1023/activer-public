import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { apiUserLogin } from 'api/axios';

interface UserState {
  isLoggedIn: boolean,
  id: number,
  realName: string,
  nickName: string,
  email: string,
  avatar: string,
  gender: string,
  birthday: string,
  profession: string,
  phone: string,
  country: string,
  area: string,
  activityHistory: Array<number>,
  tagHistory: Array<number>,
  status: number;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed',
  sessionToken: string, // auth
}

const initialState: UserState = {
  isLoggedIn: false,
  id: 0,
  realName: '',
  nickName: '',
  email: '',
  avatar: '',
  gender: '',
  birthday: '',
  profession: '',
  phone: '',
  country: '',
  area: '',
  activityHistory: [],
  tagHistory: [],
  status: 0, // 0 | 1
  loading: 'idle',
  sessionToken: '',
};

interface userLoginType {
  email: string,
  password: string,
}

export const userLogin = createAsyncThunk('auth/userLogin', async (userData: userLoginType) => {
  const response = await apiUserLogin(userData);
  console.log(response);
  return response;
});

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => ({
      ...state,
      isLoggedIn: false,
      sessionToken: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => ({
        ...state,
        loading: 'loading',
      }))
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        const { Status, User, SessionToken } = action.payload.data;
        return ({
          ...state,
          isLoggedIn: true,
          loading: 'succeeded',
          email: User.Email,
          status: Status,
          sessionToken: SessionToken,
        });
      })
      .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => ({
        ...state,
        loading: 'failed',
        status: action.payload.Status,
      }));
  },
});

export const getUserIsLoggedIn = (state: RootState) => state.userAuth.isLoggedIn;
export const getLoadingState = (state: RootState) => state.userAuth.loading;
export const getUserRealname = (state: RootState) => state.userAuth.realName;

export default userAuthSlice.reducer;
