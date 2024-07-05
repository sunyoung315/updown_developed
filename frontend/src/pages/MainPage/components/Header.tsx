import { useState } from 'react';
import LeftArrow from '@/assets/icons/left-arrow.svg';
import RightArrow from '@/assets/icons/right-arrow.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  min-width: 375px;
  max-width: 430px;
  height: 3rem;
  background-color: ${props => props.theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  position: fixed;
`;

const ArrowButton = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const DateWrapper = styled.span`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
`;

const CalendarButton = styled.img`
  width: 1.1rem;
  height: 1.1rem;
`;

const Header = () => {
  const today = new Date();
  const todayYear = new Date(today).getFullYear();
  const todayMonth = new Date(today).getMonth();
  const todayDay = new Date(today).getDate();

  const [date, setDate] = useState(today);
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();

  const selectedDate =
    year.toString() +
    '-' +
    (month < 10 ? '0' + (month + 1).toString() : (month + 1).toString()) +
    '-' +
    (day < 10 ? '0' + day.toString() : day.toString());

  const prevDate = () => {
    setDate(new Date(year, month, day - 1));
  };

  const nextDate = () => {
    setDate(new Date(year, month, day + 1));
  };

  return (
    <HeaderWrapper>
      <button onClick={prevDate}>
        <ArrowButton src={LeftArrow} />
      </button>
      <DateWrapper>
        <button>
          <CalendarButton src={CalendarIcon} />
        </button>
        {todayYear === year && todayMonth === month && todayDay === day
          ? '오늘'
          : todayYear === year && todayMonth === month && todayDay - 1 === day
            ? '어제'
            : todayYear === year && todayMonth === month && todayDay + 1 === day
              ? '내일'
              : selectedDate}
      </DateWrapper>
      <button onClick={nextDate}>
        <ArrowButton src={RightArrow} />
      </button>
    </HeaderWrapper>
  );
};

export default Header;
