import {
  MainPage,
  LoginPage,
  LoadingPage,
  SignUpPage,
  MyPage,
  DietPage,
} from '@/pages';
import { BottomNav } from '@/components';
import { getAccessToken, refreshAccessToken } from './api/auth';
import { tokenStore } from './store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  margin: auto;
  max-width: 430px;
  min-height: 100vh;
  background-color: white;
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

    refresh();
  }, [location.pathname]);

  // BottomNav가 보여야 하는 경로인지 체크
  const showBottomNav =
    location.pathname !== '/' &&
    location.pathname !== '/signup' &&
    location.pathname !== '/load';

  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/load" element={<LoadingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/diet/:category" element={<DietPage />} />
        {/* <Route path="/diet/regist/:category" element={<DietRegist />} /> */}
      </Routes>
      {showBottomNav && <BottomNav />}
    </AppWrapper>
  );
}

export default App;
