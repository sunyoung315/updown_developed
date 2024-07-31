import { useNavigate } from 'react-router-dom';
import { dateProps } from '@/types/type';
import { CalendarIcon, LeftArrow, RightArrow } from '@/assets/icons';
import styled from 'styled-components';
import { add, format, sub } from 'date-fns';

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
  z-index: 100;
`;

const DateWrapper = styled.span`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
`;

const Header = (dateProps: dateProps) => {
  const { date, setDate } = dateProps;

  const navigator = useNavigate();

  const today = format(new Date(), 'yyyy-MM-dd');

  const prevDate = () => {
    const calculatedDate = format(sub(date, { days: 1 }), 'yyyy-MM-dd');
    setDate(calculatedDate);
    localStorage.setItem('date', calculatedDate);
  };

  const nextDate = () => {
    const calculatedDate = format(add(date, { days: 1 }), 'yyyy-MM-dd');
    setDate(calculatedDate);
    localStorage.setItem('date', calculatedDate);
  };

  return (
    <HeaderWrapper>
      <LeftArrow onClick={prevDate} />
      <DateWrapper>
        <button onClick={() => navigator('/calendar')}>
          <CalendarIcon size={17} color="black" />
        </button>
        {date === today
          ? '오늘'
          : date === format(sub(today, { days: 1 }), 'yyyy-MM-dd')
            ? '어제'
            : date === format(add(today, { days: 1 }), 'yyyy-MM-dd')
              ? '내일'
              : date}
      </DateWrapper>
      <RightArrow onClick={nextDate} isButton={true} />
    </HeaderWrapper>
  );
};

export default Header;
