import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import LoadingPage from '@/pages/LoadingPage';
import MyPage from '@/pages/MyPage';
import { getAccessToken, refreshAccessToken } from './api/auth';
import { tokenStore } from './store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  margin: auto;
  max-width: 430px;
  min-height: 100vh;
  background-color: #fffefc;
`;

function App() {
  const location = useLocation();
  const { setCheckToken } = tokenStore();

  useEffect(() => {
    const refresh = async () => {
      if (
        location.pathname !== '/' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/load'
      ) {
        console.log('page rendering access token: ' + getAccessToken());
        // url이 바뀌었을 때, access token이 없으면 갱신
        if (!getAccessToken()) {
          console.log('page rendering -> refresh access token');
          const refreshed = await refreshAccessToken();
          // 페이지가 로드되고 토큰이 갱신되었는지 확인
          setCheckToken(refreshed);
        } else setCheckToken(true);
      }
    };

    refresh(); // async 함수 실행
  }, [location.pathname]); // 의존성 배열

  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/load" element={<LoadingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* <Route
          path="/mypage"
          element={<MyPage tokenRefreshed={tokenRefreshed} />}
        /> */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
