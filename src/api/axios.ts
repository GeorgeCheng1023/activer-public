import axios from 'axios';

const BASE_URL = 'http://localhost:3500';
const BASE_URL_5000 = 'http://localhost:5000/api';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// activity api
const activityRequest = axios.create({
  baseURL: BASE_URL_5000.concat('/activity'),
});
// export const apiActivityGet = (ActivityId: number) => activityRequest.get(`/${ActivityId}`);
export const apiActivityGet = () => activityRequest.get('');
