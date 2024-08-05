import { useEffect, useState } from 'react';
import {
  Header,
  DailyRecord,
  DailyDiet,
  DailyWeight,
  DailyExercise,
} from './components';
import styled from 'styled-components';
import { format } from 'date-fns';

const ContentsWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3.25rem;
`;

const MainPage = () => {
  const selectedDate = localStorage.getItem('date');
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState<string>(selectedDate || today);

  return (
    <>
      <Header date={date} setDate={setDate} />
      <ContentsWrapper>
        <DailyRecord />
        <DailyDiet />
        <DailyWeight />
        <DailyExercise />
      </ContentsWrapper>
    </>
  );
};

export default MainPage;
