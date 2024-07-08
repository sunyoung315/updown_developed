import { useState } from 'react';
import { Header, DailyRecord, DailyDiet } from './components';
import styled from 'styled-components';

const ContentsWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3.25rem;
`;

const MainPage = () => {
  const today = new Date();

  const [date, setDate] = useState(today);

  return (
    <>
      <Header date={date} setDate={setDate} />
      <ContentsWrapper>
        <DailyRecord />
        <DailyDiet date={date} />
      </ContentsWrapper>
    </>
  );
};

export default MainPage;
