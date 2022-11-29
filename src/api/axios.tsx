import axios from 'axios';

const BASE_URL = 'http://localhost:3500';
const TEST_URL = 'http://localhost:5000';

const LOGIN_URL = '/api/user/signin';
const REGISTER_URL = '/api/user/signup';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

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
