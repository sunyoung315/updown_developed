import { useEffect, useRef, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { DietIcon, ExerciseIcon, WeightIcon } from '@/assets/icons';
import { calendarProps, DayInfo } from '@/types/type';
import theme from '@/styles/theme';
import styled from 'styled-components';

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
`;

const DayOfWeek = styled.div`
  font-size: 0.95rem;
  line-height: 1.3rem;
  text-align: center;
`;

const Day = styled.button<{
  $isthismonth: boolean;
  $isselecteddate: boolean;
  $color: keyof typeof theme;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  background-color: ${props =>
    props.$isselecteddate ? theme[props.$color] : theme['white']};
  border-radius: 0.7rem;
  position: relative;
`;

const DayContent = styled.div<{
  $isthismonth: boolean;
  $isselecteddate: boolean;
  $color: keyof typeof theme;
}>`
  position: absolute;
  z-index: 1;
  font-size: 1.13rem;
  color: ${props =>
    props.$isselecteddate
      ? theme['white']
      : props.$isthismonth
        ? theme['black']
        : theme['grey']};
  text-shadow:
    -1.5px 0
      ${props =>
        props.$isselecteddate
          ? theme[props.$color]
          : props.$isthismonth
            ? theme['white']
            : theme['transparent']},
    0 1.5px
      ${props =>
        props.$isselecteddate
          ? theme[props.$color]
          : props.$isthismonth
            ? theme['white']
            : theme['transparent']},
    1.5px 0
      ${props =>
        props.$isselecteddate
          ? theme[props.$color]
          : props.$isthismonth
            ? theme['white']
            : theme['transparent']},
    0 -1.5px ${props => (props.$isselecteddate ? theme[props.$color] : props.$isthismonth ? theme['white'] : theme['transparent'])};
`;

const Calendar = (calendarProps: calendarProps) => {
  const { year, month, selectedDate, setSelectedDate, type } = calendarProps;

  const [currDate, setCurrDate] = useState<Date>(new Date(year, month - 1, 1));
  const currMonth = useRef<number>(currDate.getMonth() + 1);

  useEffect(() => {
    const newDate = new Date(year, month - 1, 1);
    setCurrDate(newDate);
    currMonth.current = newDate.getMonth() + 1;
  }, [year, month]);

  const weeks = ['일', '월', '화', '수', '목', '금', '토'];

  // date가 해당하는 월의 첫 번째 날짜
  const startCurrentMonth = startOfMonth(currDate);
  // date가 해당하는 월의 마지막 날짜
  const endCurrentMonth = endOfMonth(currDate);
  // date가 해당하는 월의 첫 번째 주의 첫 번째 날짜(일요일)
  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  // date가 해당하는 월의 마지막 주의 마지막 날짜(토요일)
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  // 달력에 나타날 날짜 리스트
  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  const daysInMonth = days.map(day => ({
    date: format(day, 'yyyy-MM-dd'),
    month: format(day, 'MM'),
    day: format(day, 'dd'),
  }));

  const selectDate = (date: string) => {
    setSelectedDate(date);
  };

  const infoList = [
    '2024-07-02',
    '2024-07-05',
    '2024-07-06',
    '2024-07-17',
    '2024-07-24',
    '2024-07-27',
  ];

  return (
    <div>
      <DayWrapper style={{ marginBottom: '0.5rem' }}>
        {weeks.map((day: string, idx: number) => (
          <DayOfWeek key={idx}>{day}</DayOfWeek>
        ))}
      </DayWrapper>
      <DayWrapper>
        {daysInMonth.map((day: DayInfo, idx: number) => (
          <Day
            key={idx}
            $isthismonth={currMonth.current === Number(day.month)}
            $isselecteddate={selectedDate === day.date}
            onClick={() => selectDate(day.date)}
            disabled={currMonth.current !== Number(day.month)}
            $color={
              type === 'diet'
                ? 'orange'
                : type === 'exercise'
                  ? 'blue'
                  : type === 'weight'
                    ? 'darkgreen'
                    : 'grey'
            }
          >
            <DayContent
              $isthismonth={currMonth.current === Number(day.month)}
              $isselecteddate={day.date === selectedDate}
              $color={
                type === 'diet'
                  ? 'orange'
                  : type === 'exercise'
                    ? 'blue'
                    : type === 'weight'
                      ? 'darkgreen'
                      : 'grey'
              }
            >
              {day.day}
            </DayContent>
            {infoList.includes(day.date) && type === 'diet' && (
              <DietIcon
                size={day.date === selectedDate ? 25 : 30}
                color={day.date === selectedDate ? 'yellow' : 'orange'}
              />
            )}
            {infoList.includes(day.date) && type === 'exercise' && (
              <ExerciseIcon
                size={day.date === selectedDate ? 25 : 30}
                color={day.date === selectedDate ? 'skyblue' : 'blue'}
              />
            )}
            {infoList.includes(day.date) && type === 'weight' && (
              <WeightIcon
                size={day.date === selectedDate ? 25 : 30}
                color={day.date === selectedDate ? 'green' : 'darkgreen'}
              />
            )}
          </Day>
        ))}
      </DayWrapper>
    </div>
  );
};

export default Calendar;
