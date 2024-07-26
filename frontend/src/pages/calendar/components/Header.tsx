import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftArrow, RightArrow, SmallArrow } from '@/assets/icons';
import { BottomSheet, Button, IconButton } from '@/components';
import { MonthRadio } from '.';
import { calendarHeaderProps } from '@/types/type';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem;
  gap: 1.2rem;
`;

const Blank = styled.div`
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  height: 1.3rem;
  gap: 0.7rem;
  font-size: 1.2rem;
`;

const YearSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  padding: 0 0.3rem;
`;

const MonthRadioWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.8rem 0;
  gap: 0.3rem 1rem;
`;

const Header = (calendarHeaderProps: calendarHeaderProps) => {
  const { year, setYear, month, setMonth } = calendarHeaderProps;

  const navigator = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  // 메인페이지로 돌아가기
  const goMain = () => {
    navigator('/main');
  };

  // 년월 선택 모달 열기
  const openModal = () => {
    setIsOpen(true);
  };

  // 년월 선택 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 년도 -1 변경
  const prevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  // 년도 +1 변경
  const nextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  // 월 변경
  const changeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(Number(e.target.value));
  };

  // 선택 년월 변경
  const changeDate = () => {
    setYear(selectedYear);
    setMonth(selectedMonth);
    setIsOpen(false);
  };

  // 월 배열
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <HeaderWrapper>
      <IconButton iconName="close" onClick={goMain} size={1.3} />
      <Date>
        <span>
          {year}. {month < 10 ? '0' + month : month}
        </span>
        <SmallArrow onClick={openModal} />
        <BottomSheet isOpen={isOpen} onClose={closeModal} title="월 선택">
          <YearSelect>
            <LeftArrow size={22} onClick={prevYear} />
            <span>{selectedYear} 년</span>
            <RightArrow size={22} onClick={nextYear} />
          </YearSelect>
          <MonthRadioWrapper>
            {monthArr.map(month => (
              <MonthRadio
                key={month}
                selectedMonth={selectedMonth}
                changeMonth={changeMonth}
                value={month}
              />
            ))}
          </MonthRadioWrapper>
          <Button buttonName="선택 완료" color="black" onClick={changeDate} />
        </BottomSheet>
      </Date>
      <Blank />
    </HeaderWrapper>
  );
};

export default Header;
