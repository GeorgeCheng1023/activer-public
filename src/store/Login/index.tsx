import { createSlice } from '@reduxjs/toolkit';

interface User {
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
}

interface LoginState {
  isLoggedIn: boolean,
  User: User;
  status: number,
  sessionToken: string, // auth
  accessToken: string, // test
}

const initialState: LoginState = {
  isLoggedIn: false,
  User: {
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
  },
  status: 0,
  sessionToken: '',
  accessToken: '',
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
});

export default loginSlice.reducer;
