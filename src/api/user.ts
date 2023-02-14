import axios from 'axios';
import { UserAPIType, UserDataType, UserRecord } from 'types/UserType';

const IP = '220.132.244.41';
const PORT = '5044';

export const TEST_URL = `http://${IP}:${PORT}`;

const USER_UPDATE_URL = '/api/user';
// api/user/auth
const LOGIN_URL = '/api/user/auth/signin';
const REGISTER_URL = '/api/user/auth/signup';
const USER_AUTH_TOKEN_URL = '/api/user/auth/token';
const USER_VERIFY_URL = '/api/user/auth/verify/email';
const USER_RESEND_VERIFY_URL = '/api/user/auth/resendVerify/email';
const USER_CHANGE_PWD = '/api/User/auth/changepassword';
const USER_RESET_PWD = '/api/User/auth/resetpassword';
const USER_RECORD = 'api/User/activity/record';

export const axiosTest = axios.create({
  baseURL: TEST_URL,
});

export const apiUserLogin = (email: string, password: string) => axiosTest.post<UserAPIType>(
  LOGIN_URL,
  JSON.stringify({ email, password }),
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  },
);

export const apiUserRegister = (
  username: string,
  email: string,
  password: string,
) => axiosTest.post<UserAPIType>(
  REGISTER_URL,
  JSON.stringify({ username, email, password }),
  {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false,
  },
);

export const apiUserUpdate = (
  userFormData: FormData,
  accessToken: string,
) => axiosTest.put<UserDataType>(
  USER_UPDATE_URL,
  userFormData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

export const apiUserAuth = (access_token: string) => axiosTest.get<UserAPIType>(
  USER_AUTH_TOKEN_URL,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  },
);

export const apiUserVerify = (
  verifycode: string,
  accessToken: string,
) => axiosTest.get<UserAPIType>(
  USER_VERIFY_URL,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    params: {
      verifyCode: verifycode,
    },
  },
);

export const apiUserResendVerify = (accessToken: string) => axiosTest.get(
  USER_RESEND_VERIFY_URL,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

export const apiUserVerifyAndChangePwd = (accessToken: string) => axiosTest.get(
  USER_CHANGE_PWD,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

export const apiUserChangePwd = (
  newPassword: string,
  accessToken: string,
  verifycode: string,
) => axiosTest.post<{ newPassword: string }>(
  USER_CHANGE_PWD,
  JSON.stringify({ newPassword }),
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    params: {
      verifycode,
    },
  },
);

export const apiUserVerifyAndResetPwd = (email: string) => axiosTest.get(
  USER_RESET_PWD,
  {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      email,
    },
  },
);

export const apiUserResetPwd = (
  newPassword: string,
  verifycode: string,
  email: string,
) => axiosTest.post<{ newPassword: string }>(
  USER_RESET_PWD,
  JSON.stringify({ newPassword }),
  {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      verifycode,
      email,
    },
  },
);

export const apiPostUserRecord = (
  activityId: number,
  content: string,
  accessToken: string,
) => axiosTest.post(
  USER_RECORD,
  { activityId, content },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

export const apiGetUserRecord = (
  activityId: number,
  accessToken: string,
) => axiosTest.get<UserRecord>(
  `${USER_RECORD}/${activityId}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

// google
export const apiUserGoogleData = (access_token: string) => axios.get(
  'https://www.googleapis.com/oauth2/v3/userinfo',
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  },
);

export default axiosTest;
