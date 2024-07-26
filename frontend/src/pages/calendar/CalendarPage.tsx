import { useEffect, useState } from 'react';
import { ButtonRadio, Calendar, Header } from './components';
import styled from 'styled-components';
import { format } from 'date-fns';

const CalendarPageWrapper = styled.div`
  margin: 0.5rem 1.5rem 3.25rem;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const InfoWrapper = styled.div`
  background-color: ${props => props.theme.lightgrey};
  border-radius: 0.6rem;
  padding: 1rem;
`;

const CalendarPage = () => {
  const date = localStorage.getItem('date');

  // 달력의 년, 월
  const [year, setYear] = useState<number>(Number(date?.substring(0, 4)) || 0);
  const [month, setMonth] = useState<number>(
    Number(date?.substring(5, 7)) || 0,
  );
  // 달력에 표시될 정보 종류
  const [type, setType] = useState<string>('diet');
  // 달력에서 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<string>(
    date || format(new Date(), 'yyyy-MM-dd'),
  );

  const typeList = ['diet', 'exercise', 'weight'];

  // 달력에 표시될 정보 종류(diet, exercise, weight) 선택
  const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  useEffect(() => {
    // 선택된 날짜에 대한 정보 갱신
  }, [selectedDate]);

  return (
    <>
      <Header year={year} setYear={setYear} month={month} setMonth={setMonth} />
      <CalendarPageWrapper>
        <RadioWrapper>
          {typeList.map((t: string, idx: number) => (
            <ButtonRadio
              key={idx}
              type={t}
              changeType={changeType}
              value={type}
            />
          ))}
        </RadioWrapper>
        <Calendar
          year={year}
          month={month}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          type={type}
        />
        <InfoWrapper>
          <div style={{ margin: '0.5rem' }}>
            {type === 'diet' ? '식단' : type === 'exercise' ? '운동' : '몸무게'}
          </div>
        </InfoWrapper>
      </CalendarPageWrapper>
    </>
  );
};

export default CalendarPage;
