import axios from 'axios';

const TEST_URL = 'http://localhost:5000';

const LOGIN_URL = '/api/user/signin';
const REGISTER_URL = '/api/user/signup';
const USER_UPDATE_URL = '/api/user';

export const axiosTest = axios.create({
  baseURL: TEST_URL,
});

export const formDataRequest = axios.create({
  baseURL: TEST_URL,
});

export const apiUserLogin = ({ email, password }: userLogin) => axiosTest.post(
  LOGIN_URL,
  JSON.stringify({ Email: email, Password: password }),
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
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
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false,
  },
);

export const apiUserUpdate = (
  user: UserState,
) => axiosTest.put(
  `${USER_UPDATE_URL}/${user.Id}`,
  JSON.stringify(user),
  {
    headers: { 'Content-Type': 'application/json' },
  },
);

export const apiUserGoogleData = (access_token: string) => axios.get(
  'https://www.googleapis.com/oauth2/v3/userinfo',
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  },
);

// activity api
const activityRequest = axios.create({
  baseURL: TEST_URL.concat('/api/activity'),
});
export const getActivity = (id: string) => activityRequest.get(`/${id}`, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosTest;
