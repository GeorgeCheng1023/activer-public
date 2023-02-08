import axios from 'axios';
import {
  BranchDataType, ManageResponseDataType, SearchHistoryResponseType, SearchResponseDataType,
} from 'types/ActivityDataType';
import { TEST_URL } from './axios';

// activity api
const activityRequest = axios.create({
  baseURL: TEST_URL.concat('/api/Activity'),
});

// GET: activity get by id
export const getActivityById = (
  id: string,
  accessToken: string,
) => (
  activityRequest.get(`/${id}`, {
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${accessToken}`,
    },
  }));

// GET: newest activity
export const getNewestActivity = () => (
  activityRequest.get('/Newest', {
    headers: {
      accept: 'text/plain',
    },
  })
);

// GET: get trend activity
export const getTrendActivity = () => (
  activityRequest.get('/trend', {
    headers: {
      accept: 'text/plain',
    },
  })
);

// POST: update branch status
export const postActivityStatus = (
  activityId:string,
  branchId: string,
  status: BranchDataType['status'],
  accessToken: string,
) => (
  activityRequest.post(
    '/branch/dreamStatus',
    {
      activityId,
      branchId,
      status,
    },
    {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },

    },
  )
);

// GET: Search
interface getSearchActivityPropsType {
  keywords?: string,
  tags?: string[],
  countPerSegment: number,
  currentSegment: number,
  accessToken?: string
}
export const postSearchActivity = (
  reqBody: getSearchActivityPropsType,
) => (
  activityRequest.post<SearchResponseDataType>(
    '/search',
    reqBody,
    {
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqBody.accessToken}`,
      },
    },
  )
);

export default activityRequest;

// GET: Activity in Manage Page
export const getManageActivity = (accessToken: string) => (
  activityRequest.get<ManageResponseDataType[]>(
    '/dreamAndRegistered',
    {
      headers: {
        accept: 'text/plain',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
);

// GET: fetch user's search history
export const getSearchHistory = (accessToken: string) => (
  activityRequest.get<SearchHistoryResponseType[]>('/searchHistory', {
    headers: {
      accept: 'text/plain',
      Authorization: `Bearer ${accessToken}`,
    },
  })
);
