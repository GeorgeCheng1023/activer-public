import { TrendTagDataType } from 'types/ActivityDataType';
import axios from 'axios';
import { TrendTagResponseType } from 'types/Response';
import { TEST_URL } from './user';

const tagRequest = axios.create({
  baseURL: TEST_URL.concat('/api/Tag'),
});

// GET: all tags
export const getAllTags = () => (
  tagRequest.get<TrendTagDataType[]>(
    '/',
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  )
);
// GET: Trend Tag
export const getTrendTag = (
  countPerSegment: number,
  currentSegment: number,
  accessToken: string,
) => (
  tagRequest.post<TrendTagResponseType>(
    '/trend',
    {
      countPerSegment,
      currentSegment,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  )
);

export default tagRequest;
