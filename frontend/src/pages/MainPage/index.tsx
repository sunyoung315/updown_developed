import { Header, DailyRecord, DailyDiet } from './components';
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
      <DailyDiet />
      <button onClick={goMyPage}>마이페이지</button>
    </>
  );
};

export default MainPage;
