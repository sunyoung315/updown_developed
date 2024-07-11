import { useState } from 'react';
import { Header, DailyRecord, DailyDiet, DailyWeight } from './components';
import styled from 'styled-components';

const ContentsWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3.25rem;
`;

const MainPage = () => {
  const today = new Date();

  const [date, setDate] = useState(today);

  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();

  const regDate =
    year.toString() +
    '-' +
    (month < 10 ? '0' + (month + 1).toString() : (month + 1).toString()) +
    '-' +
    (day < 10 ? '0' + day.toString() : day.toString());

  return (
    <>
      <Header date={date} setDate={setDate} />
      <ContentsWrapper>
        <DailyRecord />
        <DailyDiet regDate={regDate} />
        <DailyWeight regDate={regDate} />
      </ContentsWrapper>
    </>
  );
};

export default MainPage;
