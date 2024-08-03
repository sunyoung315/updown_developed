import { httpStatusCode } from '@/util/http-status';
import useAxios from '@/util/http-commons';

// Access Token을 저장할 private variable
let accessToken = '';

// Access Token 갱신
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await useAxios.get('/auth/token');

    // UNAUTHORIZED : refresh token도 만료됐으므로 다시 로그인
    if (response.status === httpStatusCode.UNAUTHORIZED) {
      window.location.href = '/';
      return false;
    } else {
      console.log('refresh access token: ', response?.data?.accessToken);
      setAccessToken(response?.data?.accessToken);
      return true;
    }
  } catch (err) {
    console.log('Error: ', err);
    throw err;
  }
};

// Access Token 반환
const getAccessToken = () => {
  return accessToken;
};

// Access Token 유효성 체크
const isAccessToken = () => {
  if (getAccessToken()) return true;
  return false;
};

// Access Token 저장
const setAccessToken = (newAccessToken: string) => {
  accessToken = newAccessToken;
};

export { 
  getAccessToken, 
  isAccessToken, 
  setAccessToken, 
  refreshAccessToken 
};
