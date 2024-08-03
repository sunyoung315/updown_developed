import { useState } from 'react';
import LeftArrow from '@/assets/icon/left-arrow.svg';
import RightArrow from '@/assets/icon/right-arrow.svg';
import CalendarIcon from '@/assets/icon/calendar.svg';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 2rem;
  background-color: #fffefc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const ArrowButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateWrapper = styled.span`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const CalendarButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <ArrowButton onClick={prevDate}>
        <img src={LeftArrow} />
      </ArrowButton>
      <DateWrapper>
        <CalendarButton>
          <img src={CalendarIcon} />
        </CalendarButton>
        {todayYear === year && todayMonth === month && todayDay === day
          ? '오늘'
          : todayYear === year && todayMonth === month && todayDay - 1 === day
            ? '어제'
            : todayYear === year && todayMonth === month && todayDay + 1 === day
              ? '내일'
              : selectedDate}
      </DateWrapper>
      <ArrowButton onClick={nextDate}>
        <img src={RightArrow} />
      </ArrowButton>
    </HeaderWrapper>
  );
};

export default Header;
