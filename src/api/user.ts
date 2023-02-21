import axios from 'axios';
import { UserAPIType, UserRecord } from 'types/UserType';
import { CommentResponseType } from '../types/Response/index';

const IP = '220.132.244.41';
const PORT = '5044';

export const TEST_URL = `http://${IP}:${PORT}`;

const USER_UPDATE_URL = '/';
// api/user/auth
const LOGIN_URL = '/auth/signin';
const REGISTER_URL = '/auth/signup';
const USER_AUTH_TOKEN_URL = '/auth/token';
const USER_VERIFY_URL = '/auth/verify/email';
const USER_RESEND_VERIFY_URL = '/auth/resendVerify/email';
const USER_CHANGE_PWD = '/auth/changepassword';
const USER_RESET_PWD = '/auth/resetpassword';
const USER_RECORD = '/activity/record';
const USER_ADD_COMMENT = '/comment';
const USER_GET_ALL_COMMENT = '/comments';

const userRequest = axios.create({
  baseURL: TEST_URL.concat('/api/user'),
});

// POST: signin
export const apiUserLogin = (email: string, password: string) => userRequest.post<UserAPIType>(
  LOGIN_URL,
  JSON.stringify({ email, password }),
  {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  },
);

// POST: register
export const apiUserRegister = (
  username: string,
  email: string,
  password: string,
) => userRequest.post<UserAPIType>(
  REGISTER_URL,
  JSON.stringify({ username, email, password }),
  {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  },
);

// PUT: user update data
export const apiUserUpdate = (
  userFormData: FormData,
  accessToken: string,
) => userRequest.put(
  USER_UPDATE_URL,
  userFormData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

// GET: user auth
export const apiUserAuth = (access_token: string) => userRequest.get<UserAPIType>(
  USER_AUTH_TOKEN_URL,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  },
);

// GET: verify user
export const apiUserVerify = (
  verifycode: string,
  accessToken: string,
) => userRequest.get<UserAPIType>(
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

// GET: resend
export const apiUserResendVerify = (accessToken: string) => userRequest.get(
  USER_RESEND_VERIFY_URL,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

// GET: verify user before change pwd
export const apiUserVerifyAndChangePwd = (accessToken: string) => userRequest.get(
  USER_CHANGE_PWD,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

// POST: send new pwd
export const apiUserChangePwd = (
  newPassword: string,
  accessToken: string,
  verifycode: string,
) => userRequest.post<{ newPassword: string }>(
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

// GET: verify user before reset pwd
export const apiUserVerifyAndResetPwd = (email: string) => userRequest.get(
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

// POST: send new pwd
export const apiUserResetPwd = (
  newPassword: string,
  verifycode: string,
  email: string,
) => userRequest.post<{ newPassword: string }>(
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

// POST: send user's record
export const apiPostUserRecord = (
  activityId: number,
  content: string,
  accessToken: string,
) => userRequest.post(
  USER_RECORD,
  { activityId, content },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

// GET: get user's record
export const apiGetUserRecord = (
  activityId: number,
  accessToken: string,
) => userRequest.get<UserRecord>(
  `${USER_RECORD}/${activityId}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);

export const apiGetAvatar = (userId: number) => userRequest.get(
  `/avatar/${userId}`,
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

export const postComment = (
  activityId: number,
  comment: string | null,
  star: number,
  access_token: string,
) => (
  userRequest.post(
    USER_ADD_COMMENT,
    {
      activityId,
      comment,
      star,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )
);

export const getComment = (
  countPerSegment: number,
  currentSegment: number,
  activityId: number,
  access_token: string,
) => (
  userRequest.post<CommentResponseType>(
    USER_GET_ALL_COMMENT,
    {
      currentSegment,
      countPerSegment,
      activityId,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )
);

export const deleteComment = (
  commentId: string,
  access_token: string,
) => (
  userRequest.delete(
    `/comment/${commentId}`,
    {

      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },

  )
);

export const getTagVote = (
  activityId: string,
  tagId: string,
  access_token: string,
) => (
  userRequest.get(
    'tagVote',
    {
      params: {
        activityId,
        tagId,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )
);

export const getTagUnvote = (
  activityId: string,
  tagId: string,
  access_token: string,
) => (
  userRequest.get(
    'tagUnVote',
    {
      params: {
        activityId,
        tagId,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )
);

export default userRequest;
