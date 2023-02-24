import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { apiUserGoogleData } from 'api/user';
import { UserDataType } from 'types/UserType';

const initialState: UserDataType = {
  id: 0,
  realName: '',
  nickName: '',
  email: '',
  verify: false,
  avatar: '',
  gender: '',
  birthday: '',
  profession: '',
  phone: '',
  county: '',
  area: '',
  activityHistory: [],
  tagHistory: [],
};

interface UpdateSingleDataType {
  key: string,
  value: any,
}

// async action
export const getUserGoogleData = createAsyncThunk('auth/getUserGoogleData', async (accessToken: string) => {
  const response = await apiUserGoogleData(accessToken);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserDataType>) => ({
      ...state,
      ...action.payload,
    }),
    updateSingleData: (state, action: PayloadAction<UpdateSingleDataType>) => {
      const { key, value } = action.payload;

      // if (key as keyof UserDataType) {
      //   console.log(key);
      // } else {
      //   return { ...state };
      // }

      return {
        ...state,
        [key]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGoogleData.fulfilled, (state, action) => {
        const userData = action.payload.data;
        return ({
          ...state,
          nickName: userData.name,
          avatar: userData.picture,
          email: userData.email,
        });
      });
  },
});

export const getUserData = (state: RootState) => state.user;

export const { updateUser, updateSingleData } = userSlice.actions;

export default userSlice.reducer;
