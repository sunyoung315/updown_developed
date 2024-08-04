import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { setAccessToken } from '@/api/auth';
import styled, { keyframes } from 'styled-components';

const LoadWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const spinx = keyframes`
  0%, 49% {
    transform: rotate(0deg);
    background-position: 50% 36px;
  }
  51%, 98% {
    transform: rotate(180deg);
    background-position: 50% 4px;
  }
  100% {
    transform: rotate(360deg);
    background-position: 50% 36px;
  }
`;

const lqt = keyframes`
  0%, 100% {
    background-image: linear-gradient(#FBDD6B 40px, transparent 0);
    background-position: 0% 0px;
  }
  50% {
    background-image: linear-gradient(#FBDD6B 40px, transparent 0);
    background-position: 0% 40px;
  }
  50.1% {
    background-image: linear-gradient(#FBDD6B 40px, transparent 0);
    background-position: 0% -40px;
  }
`;

const lqb = keyframes`
  0% {
    background-image: linear-gradient(#FBDD6B 40px, transparent 0);
    background-position: 0 40px;
  }
  100% {
    background-image: linear-gradient(#FBDD6B 40px, transparent 0);
    background-position: 0 -40px;
  }
`;

const Loader = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 50px;
  height: 80px;
  border-top: 5px solid #b7b7b7;
  border-bottom: 5px solid #b7b7b7;
  position: relative;
  background: linear-gradient(#fbdd6b 30px, transparent 0) no-repeat;
  background-size: 2px 40px;
  background-position: 50% 0px;
  animation: ${spinx} 5s linear infinite;

  &:before,
  &:after {
    content: '';
    width: 40px;
    left: 50%;
    height: 35px;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    background: rgba(200, 200, 200, 0.25);
    border-radius: 0 0 20px 20px;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: 0 0px;
    animation: ${lqt} 5s linear infinite;
  }

  &:after {
    top: auto;
    bottom: 0;
    border-radius: 20px 20px 0 0;
    animation: ${lqb} 5s linear infinite;
  }
`;

const reveal = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const Letter = styled.span<{ $delay: string }>`
  color: ${props => props.theme.grey};
  display: inline-block;
  opacity: 0;
  animation: ${reveal} 0.5s forwards;
  animation-delay: ${props => props.$delay};
`;

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

  const message = '로그인 중입니다 ...';

  return (
    <LoadWrapper>
      <Loader></Loader>
      <div>
        {message.split('').map((char: string, idx: number) => (
          <Letter key={idx} $delay={`${idx * 300}ms`}>
            {char === ' ' ? '\u00A0' : char}
          </Letter>
        ))}
      </div>
    </LoadWrapper>
  );
};

export default LoadingPage;
