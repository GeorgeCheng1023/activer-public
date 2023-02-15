import axios from 'axios';
import ActivityDataType, {
  ActivityResponseDataType,
  BranchDataType,
  ManageResponseDataType,
  SearchHistoryResponseType,
  SearchResponseDataType,
} from 'types/ActivityDataType';
import { TEST_URL } from './user';

// activity api
const activityRequest = axios.create({
  baseURL: TEST_URL.concat('/api/Activity'),
});

// GET: activity get by id
export const getActivityById = (
  id: string,
  accessToken: string,
) => (
  activityRequest.get<ActivityDataType>(`/${id}`, {
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${accessToken}`,
    },
  }));

// POST: get newest activity
export const getNewestActivity = (countPerSegment: number, currentSegment: number) => (
  activityRequest.post<ActivityResponseDataType>(
    '/Newest',
    {
      countPerSegment, currentSegment,
    },
    {
      headers: {
        accept: 'text/plain',
      },
    },
  )
);

// POST: get trend activity
export const getTrendActivity = (countPerSegment: number, currentSegment: number) => (
  activityRequest.post<ActivityResponseDataType>(
    '/trend',
    { countPerSegment, currentSegment },
    {
      headers: {
        accept: 'text/plain',
      },
    },
  )
);

// POST: update branch status
export const postActivityStatus = (
  activityId:string,
  branchId: string,
  status: BranchDataType['status'],
  accessToken: string,
) => (
  activityRequest.post<ActivityDataType>(
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
export const getSearchHistory = (
  countPerSegment: number,
  currentSegment: number,
  accessToken: string,
) => (
  activityRequest.post<SearchHistoryResponseType>(
    '/searchHistory',
    {
      countPerSegment,
      currentSegment,
    },
    {
      headers: {
        accept: 'text/plain',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
);
// DELETE: delete user's search history
export const deleteSearchHistory = (
  ids: number[],
  accessToken: string,
) => (
  activityRequest.delete<SearchHistoryResponseType>(
    '/searchHistory',
    {
      data: ids,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  )
);

// GET: get activity history
export const getActivityHistory = (
  accessToken: string,
) => (
  activityRequest.get<ActivityDataType>('/history', {
    headers: {
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${accessToken}`,
    },
  }));
