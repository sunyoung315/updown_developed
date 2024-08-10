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
