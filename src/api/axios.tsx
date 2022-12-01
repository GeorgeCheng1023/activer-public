import axios from 'axios';

const TEST_URL = 'http://localhost:5000';

const LOGIN_URL = '/api/user/signin';
const USER_UPDATE_URL = '/api/user/update';
const REGISTER_URL = '/api/user/signup';

export const axiosTest = axios.create({
  baseURL: TEST_URL,
});

interface userLogin {
  email: string,
  password: string,
}

export const apiUserLogin = ({ email, password }: userLogin) => axiosTest.post(
  LOGIN_URL,
  JSON.stringify({ Email: email, Password: password }),
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  },
);

export const apiUserRegister = (
  username: string,
  email: string,
  password: string,
) => axiosTest.post(
  REGISTER_URL,
  JSON.stringify({ Realname: username, Email: email, Password: password }),
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  },
);

interface User {
  id: number,
  realName?: string,
  nickName?: string,
  email?: string,
  avatar?: string,
  gender?: string,
  birthday?: string,
  profession?: string,
  phone?: string,
  country?: string,
  area?: string,
  activityHistory?: Array<number>,
  tagHistory?: Array<number>,
  status: number;
  sessionToken: string, // auth
}

export const apiUserUpdate = (
  user: User,
) => axiosTest.post(
  USER_UPDATE_URL,
  JSON.stringify(user),
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  },
);
