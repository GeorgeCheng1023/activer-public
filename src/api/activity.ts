import axios from 'axios';
import { TEST_URL } from './axios';

// activity api
const activityRequest = axios.create({
  baseURL: TEST_URL.concat('/api/Activity'),
});

// GET: /api/Activity/{id}, activity get by id
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

// POST: update branch status
export const updateActivityStatus = (
  activityId:string,
  branchId: string,
  status: string,
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
export const searchActivity = (
  reqKeyword: string,
  reqTagsText: string[],
) => {
  const reqParams = {
    keyword: reqKeyword,
    tags: reqTagsText.length === 0 ? [' '] : reqTagsText,
  };

  return (
    activityRequest.get(
      '/search',
      {
        params: reqParams,
        paramsSerializer: {
          indexes: null,
        },
        headers: {
          accept: 'text/plain',
        },

      },
    )
  );
};

export default activityRequest;
