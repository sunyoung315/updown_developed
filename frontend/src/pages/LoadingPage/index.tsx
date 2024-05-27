import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '@/util/http-commons';
// import axios from 'axios';
import { httpStatusCode } from '@/util/http-status';
import { setAccessToken } from '@/api/auth';

const LoadingPage = () => {
  const navigator = useNavigate();

  useEffect(() => {
    let isRefreshing = false;

    const loginKakao = async () => {
      try {
        if (isRefreshing) return;
        isRefreshing = true;

        // 백엔드로부터 인증 처리 후 엑세스 토큰을 발급
        const response = await useAxios.get('/auth/kakao');

        // 기존 회원
        if (response.status === httpStatusCode.OK) {
          setAccessToken(response.data);
          // 메인페이지로 이동!
          navigator('/main');
        }
        // 신규 회원
        else if (response.status === httpStatusCode.ACCEPTED) {
          setAccessToken(response.data);
          console.log('로그인: ', response.data);
          // 회원가입 페이지로 이동!
          navigator('/signup');
        }
      } catch (error) {
        console.log('로그인 에러', error);
      } finally {
        isRefreshing = false;
      }
    };

    loginKakao();
  }, []);

  return (
    <>
      <div>로그인 중입니다.</div>
    </>
  );
};

export default LoadingPage;
