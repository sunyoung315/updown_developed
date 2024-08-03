import kakao from '@/assets/image/kakao_btn.png';
import styled from 'styled-components';

const MainPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('src/assets/image/mainpage.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const BASE_URL = 'http://43.200.9.203:8080';
const KAKAO_AUTH_URI = `${BASE_URL}/oauth2/authorization/kakao`;

const LoginPage = () => {
  return (
    <MainPageWrapper>
      <ButtonWrpper href={KAKAO_AUTH_URI}>
        <LoginButton src={kakao} alt="login" />
      </ButtonWrpper>
    </MainPageWrapper>
  );
};

export default LoginPage;
