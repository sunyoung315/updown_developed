import { useNavigate } from 'react-router-dom';
import { dateProps } from '@/types/type';
import { LeftArrow, RightArrow } from '@/assets/icons';
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

const Header = (dateProps: dateProps) => {
  const { date, setDate } = dateProps;

  const navigator = useNavigate();

  const today = new Date();
  const todayYear = new Date(today).getFullYear();
  const todayMonth = new Date(today).getMonth();
  const todayDay = new Date(today).getDate();

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
    localStorage.setItem('date', date.toString());
  };

  const nextDate = () => {
    setDate(new Date(year, month, day + 1));
    localStorage.setItem('date', date.toString());
  };

  localStorage.setItem('date', selectedDate);

  return (
    <HeaderWrapper>
      <LeftArrow onClick={prevDate} />
      <DateWrapper>
        <button onClick={() => navigator('/calendar')}>
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
      <RightArrow onClick={nextDate} isButton={true} />
    </HeaderWrapper>
  );
};

export default Header;
