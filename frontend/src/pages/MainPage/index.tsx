import Header from './components/Header';
import DailyRecord from './components/DailyRecord';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigator = useNavigate();
  const goMyPage = () => {
    navigator('/mypage');
  };

  return (
    <>
      <Header />
      <DailyRecord />
      <button onClick={goMyPage}>마이페이지</button>
    </>
  );
};

export default MainPage;
