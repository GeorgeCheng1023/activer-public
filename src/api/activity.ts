import axios from 'axios';
import { TEST_URL } from './axios';

// activity api
const activityRequest = axios.create({
  baseURL: TEST_URL.concat('/api/activity'),
});

// GET: /api/Activity/{id}
export const getActivityById = (id: string) => (
  activityRequest.get(`/${id}`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  }));

export default activityRequest;
