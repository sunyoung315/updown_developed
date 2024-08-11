import kakao from '/images/kakao_btn.png';
import styled from 'styled-components';

const MainPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('/images/mainpage.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const ButtonWrpper = styled.button`
const ButtonWrpper = styled.a`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const LoginButton = styled.img`
  width: 50%;
`;

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const KAKAO_AUTH_URI = `${BASE_URL}/oauth2/authorization/kakao`;

// 서비스 워커 등록 상태 확인 및 로그인 요청 처리
const handleLogin = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      // 서비스 워커가 등록되어 있다면 unregister
      await registration.unregister();
    }
  }

  const kakaoLoginUrl = `${BASE_URL}/oauth2/authorization/kakao`; // 카카오 로그인 URL
  window.location.href = kakaoLoginUrl; // 로그인 페이지로 리다이렉트
};

const LoginPage = () => {
  return (
    <MainPageWrapper>
      {/* <ButtonWrpper href={KAKAO_AUTH_URI}>
        <LoginButton src={kakao} alt="login" />
      </ButtonWrpper> */}
      <ButtonWrpper onClick={handleLogin}>
        <LoginButton src={kakao} alt="login" />
      </ButtonWrpper>
    </MainPageWrapper>
  );
};

export default LoginPage;
