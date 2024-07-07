import styled from 'styled-components';
import { Header, DailyRecord, DailyDiet } from './components';

const ContentsWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3.25rem;
`;

const MainPage = () => {
  return (
    <>
      <Header />
      <ContentsWrapper>
        <DailyRecord />
        <DailyDiet />
      </ContentsWrapper>
    </>
  );
};

export default MainPage;
