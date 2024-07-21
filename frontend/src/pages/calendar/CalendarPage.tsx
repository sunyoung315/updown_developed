import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet, Button, IconButton } from '@/components';
import SmallArrow from '@/assets/icons/small-arrow.svg';
import styled from 'styled-components';
import { LeftArrow, RightArrow } from '@/assets/icons';

const HeaderWrapper = styled.div`
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.3rem;
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
  padding: 0 0.2rem;
`;

const MonthSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem 0;
`;

const Month = styled.label<{ $month: number; $value: number }>`
  width: auto;
  line-height: 2.5rem;
  font-size: 1.13rem;
  text-align: center;
  border-radius: 0.5rem;
  margin: 0.3rem 0.7rem;
  background-color: ${props =>
    props.$month === props.$value
      ? props.theme.purple
      : props.theme.transparent};
  color: ${props =>
    props.$month === props.$value ? props.theme.white : props.theme.black};
`;

const CalendarPage = () => {
  const navigator = useNavigate();

  const date = localStorage.getItem('date');
  const [year, setYear] = useState<number>(Number(date?.substring(0, 4)) || 0);
  const [month, setMonth] = useState<number>(
    Number(date?.substring(5, 7)) || 0,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const goMain = () => {
    navigator('/main');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setYear(Number(date?.substring(0, 4)));
    setMonth(Number(date?.substring(5, 7)));
  };

  const prevYear = () => {
    setYear(year - 1);
  };

  const nextYear = () => {
    setYear(year + 1);
  };

  const changeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(Number(e.target.value));
    console.log(e.target.value);
  };

  const changeDate = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        <IconButton iconName="close" onClick={goMain} size={1.3} />
        <Date>
          <span>
            {year}. {month < 10 ? '0' + month : month}
          </span>
          <button onClick={openModal}>
            <img src={SmallArrow} alt="icon" />
          </button>
          <BottomSheet isOpen={isOpen} onClose={closeModal} title="월 선택">
            <YearSelect>
              <button onClick={prevYear}>
                <LeftArrow size={22} />
              </button>
              <span>{year} 년</span>
              <button onClick={nextYear}>
                <RightArrow size={22} />
              </button>
            </YearSelect>
            <MonthSelect>
              <Month htmlFor="jan" $month={month} $value={1}>
                1월
              </Month>
              <input
                type="radio"
                id="jan"
                name="month"
                value={1}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="feb" $month={month} $value={2}>
                2월
              </Month>
              <input
                type="radio"
                id="feb"
                name="month"
                value={2}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="mar" $month={month} $value={3}>
                3월
              </Month>
              <input
                type="radio"
                id="mar"
                name="month"
                value={3}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="apr" $month={month} $value={4}>
                4월
              </Month>
              <input
                type="radio"
                id="apr"
                name="month"
                value={4}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="may" $month={month} $value={5}>
                5월
              </Month>
              <input
                type="radio"
                id="may"
                name="month"
                value={5}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="jun" $month={month} $value={6}>
                6월
              </Month>
              <input
                type="radio"
                id="jun"
                name="month"
                value={6}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="jul" $month={month} $value={7}>
                7월
              </Month>
              <input
                type="radio"
                id="jul"
                name="month"
                value={7}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="aug" $month={month} $value={8}>
                8월
              </Month>
              <input
                type="radio"
                id="aug"
                name="month"
                value={8}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="sep" $month={month} $value={9}>
                9월
              </Month>
              <input
                type="radio"
                id="sep"
                name="month"
                value={9}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="oct" $month={month} $value={10}>
                10월
              </Month>
              <input
                type="radio"
                id="oct"
                name="month"
                value={10}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="nov" $month={month} $value={11}>
                11월
              </Month>
              <input
                type="radio"
                id="nov"
                name="month"
                value={11}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
              <Month htmlFor="dec" $month={month} $value={12}>
                12월
              </Month>
              <input
                type="radio"
                id="dec"
                name="month"
                value={12}
                style={{ display: 'none' }}
                onChange={changeMonth}
              />
            </MonthSelect>
            <Button
              buttonName="선택 완료"
              color="purple"
              onClick={changeDate}
            />
          </BottomSheet>
        </Date>
        <Blank />
      </HeaderWrapper>
    </>
  );
};

export default CalendarPage;
