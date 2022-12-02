import axios from 'axios';

const BASE_URL = 'http://localhost:3500';
const BASE_URL_5000 = 'http://localhost:5000/api';

// base api
const baseRequest = axios.create({
  baseURL: BASE_URL,
});

// activity api
const activityRequest = axios.create({
  baseURL: BASE_URL_5000.concat('/activity'),
});
export const getActivity = (id: string) => activityRequest.get(`/${id}`, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default baseRequest;
