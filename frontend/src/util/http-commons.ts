import axios from 'axios';
import { getAccessToken, refreshAccessToken } from '@/api/auth.ts';
import { httpStatusCode } from './http-status';

const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// const VITE_APP_BASE_URL = 'http://43.200.9.203:8080';

const useAxios = axios.create({
  baseURL: VITE_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

useAxios.interceptors.request.use(
  async config => {
    // access token을 사용하지 않는 url은 제외
    if (
      !config.url?.includes('/auth/kakao') &&
      !config.url?.includes('/auth/login') &&
      !config.url?.includes('/auth/signup') &&
      !config.url?.includes('/auth/token')
    ) {
      console.log('interceptor request :', getAccessToken());
      // 토큰이 없으면 갱신하기
      if (!getAccessToken()) await refreshAccessToken();

      config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

useAxios.interceptors.response.use(
  response => {
    // console.log('interceptor response:', response);
    return response;
  },
  async error => {
    // token이 만료되었으면 갱신하여 재요청
    if (error.response?.status == httpStatusCode.UNAUTHORIZED) {
      console.log('interceptor response error:', getAccessToken());
      await refreshAccessToken();

      error.config.headers['Authorization'] = `Bearer ${getAccessToken()}`;

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  },
);

export default useAxios;
