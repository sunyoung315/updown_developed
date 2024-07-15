import {
  MainPage,
  LoginPage,
  LoadingPage,
  SignUpPage,
  MyEditPage,
  MyPage,
  DietDetailPage,
  DietEditPage,
  DietPage,
  DietRegistPage,
  DietSearchPage,
  ExerciseDetailPage,
  ExerciseEditPage,
  ExercisePage,
  ExerciseRegistPage,
  ExerciseSearchPage,
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

    // 페이지 이동했을 때 스크롤 제일 위로 이동
    window.scrollTo(0, 0);

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
        <Route path="/mypage/edit" element={<MyEditPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/diet/detail/:foodId" element={<DietDetailPage />} />
        <Route path="/diet/edit/:foodId" element={<DietEditPage />} />
        <Route path="/diet/:category" element={<DietPage />} />
        <Route path="/diet/regist" element={<DietRegistPage />} />
        <Route path="/diet/search" element={<DietSearchPage />} />
        <Route
          path="/exercise/detail/:exerciseId"
          element={<ExerciseDetailPage />}
        />
        <Route
          path="/exercise/edit/:exerciseId"
          element={<ExerciseEditPage />}
        />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/exercise/regist" element={<ExerciseRegistPage />} />
        <Route path="/exercise/search" element={<ExerciseSearchPage />} />
      </Routes>
      {showBottomNav && <BottomNav />}
    </AppWrapper>
  );
}

export default App;
