import axios from 'axios';
import { TEST_URL } from './user';

const tagRequest = axios.create({
  baseURL: TEST_URL.concat('/api/Tag'),
});

// GET: all tags
export const getAllTags = () => (
  tagRequest.get(
    '/',
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  )
);

export default tagRequest;
