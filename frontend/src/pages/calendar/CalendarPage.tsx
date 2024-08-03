import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components';
import { Box, ButtonRadio, Calendar, Header } from './components';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { CalendarDiet, CalendarExercise, CalendarWeight } from '@/types/type';
import styled from 'styled-components';

const CalendarPageWrapper = styled.div`
  padding: 0.5rem 1.5rem 4.75rem;
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: scroll;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const InfoWrapper = styled.div`
  background-color: ${props => props.theme.lightgrey};
  border-radius: 0.6rem;
  padding: 0.9rem;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NoInfo = styled.div`
  font-size: 1rem;
  margin-top: 0.2rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 0.4rem;
  background-color: ${props => props.theme.white};
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.3rem;
  column-gap: 1.3rem;
  padding: 1rem 0 1rem;
`;

const CalendarPage = () => {
  const navigator = useNavigate();

  const date = localStorage.getItem('date');

  const today = format(new Date(), 'yyyy-MM-dd');

  // 달력의 년, 월
  const [year, setYear] = useState<number>(Number(date?.substring(0, 4)) || 0);
  const [month, setMonth] = useState<number>(
    Number(date?.substring(5, 7)) || 0,
  );
  // 달력에서 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<string>(
    date || format(new Date(), 'yyyy-MM-dd'),
  );

  // 달력에 표시될 정보 종류
  const [type, setType] = useState<'diet' | 'exercise' | 'weight'>('diet');

  // 해당 년월의 식단 정보
  const [dietData, setDietData] = useState<CalendarDiet[]>([]);
  // 해당 년월의 운동 정보
  const [exerciseData, setExerciseData] = useState<CalendarExercise[]>([]);
  // 해당 년월의 몸무게 정보
  const [weightData, setWeightData] = useState<CalendarWeight[]>([]);

  // 선택한 날짜의 정보
  const [selectedInfo, setSelectedInfo] = useState<any>([]);
  // 해당 년월에 정보가 있는 날짜 리스트
  const [dateList, setDateList] = useState<string[]>([]);

  // 버튼 타입 종류 리스트
  const typeList = ['diet', 'exercise', 'weight'];

  // 달력에 표시될 정보 종류(diet, exercise, weight) 선택
  const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as 'diet' | 'exercise' | 'weight');
  };

  // 월별 식단 정보 조회
  const getDietInfos = async () => {
    try {
      const response = await useAxios.get<CalendarDiet[]>('/calendar/diet', {
        params: { year, month },
      });

      if (response.status === httpStatusCode.OK) {
        const data = response.data;
        // 1. 해당 년월의 식단 정보 갱신
        setDietData(data);
        // 2. 해당 년월의 식단 정보가 있는 날짜 리스트 갱신
        const infoDates = new Set(
          response.data.map((d: CalendarDiet) => d.regDate),
        );
        setDateList([...infoDates]);
        // 3. 선택된 날짜에 대한 정보 갱신
        setSelectedInfo(
          data.filter((d: CalendarDiet) => d.regDate === selectedDate),
        );
      }
    } catch (err) {
      console.log('월별 식단 정보 조회 에러:', err);
    }
  };

  // 월별 운동 정보 조회
  const getExerciseInfos = async () => {
    try {
      const response = await useAxios.get<CalendarExercise[]>(
        '/calendar/exercise',
        {
          params: { year, month },
        },
      );

      if (response.status === httpStatusCode.OK) {
        const data = response.data;
        // 1. 해당 년월의 식단 정보 갱신
        setExerciseData(data);
        // 2. 해당 년월의 식단 정보가 있는 날짜 리스트 갱신
        const infoDates = new Set(
          response.data.map((d: CalendarExercise) => d.regDate),
        );
        setDateList([...infoDates]);
        // 3. 선택된 날짜에 대한 정보 갱신
        setSelectedInfo(
          data.filter((d: CalendarExercise) => d.regDate === selectedDate),
        );
      }
    } catch (err) {
      console.log('월별 운동 정보 조회 에러:', err);
    }
  };

  // 월별 몸무게 정보 조회
  const getWeightInfos = async () => {
    try {
      const response = await useAxios.get<CalendarWeight[]>(
        '/calendar/weight',
        {
          params: { year, month },
        },
      );

      if (response.status === httpStatusCode.OK) {
        const data = response.data;
        // 1. 해당 년월의 식단 정보 갱신
        setWeightData(data);
        // 2. 해당 년월의 식단 정보가 있는 날짜 리스트 갱신
        const infoDates = new Set(
          response.data.map((d: CalendarWeight) => d.regDate),
        );
        setDateList([...infoDates]);
        // 3. 선택된 날짜에 대한 정보 갱신
        setSelectedInfo(
          data.filter((d: CalendarWeight) => d.regDate === selectedDate),
        );
      }
    } catch (err) {
      console.log('월별 몸무게 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    // 선택된 날짜에 대한 정보 갱신
    if (type === 'diet')
      setSelectedInfo(dietData.filter(d => d.regDate === selectedDate));
    else if (type === 'exercise')
      setSelectedInfo(exerciseData.filter(e => e.regDate === selectedDate));
    else if (type === 'weight')
      setSelectedInfo(weightData.filter(w => w.regDate === selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    // 선택한 년월에 정보가 있는 날짜 리스트 갱신
    if (type === 'diet') {
      getDietInfos();
    } else if (type === 'exercise') {
      getExerciseInfos();
    } else if (type === 'weight') {
      getWeightInfos();
    }
  }, [year, month, type]);

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
          dateList={dateList}
        />
        <InfoWrapper>
          <div style={{ margin: '0.2rem 0.5rem 0.4rem' }}>
            {type === 'diet' ? '식단' : type === 'exercise' ? '운동' : '몸무게'}
          </div>
          <BoxWrapper>
            {selectedInfo.length > 0 ? (
              selectedInfo.map((info: any, idx: number) => (
                <Box type={type} selectedInfo={info} key={idx} />
              ))
            ) : (
              <NoInfo>등록된 정보가 없습니다!</NoInfo>
            )}
          </BoxWrapper>
        </InfoWrapper>
        <ButtonWrapper>
          <Button
            buttonName="오늘 날짜로 이동"
            onClick={() => {
              localStorage.setItem('date', today);
              navigator('/main');
            }}
            color={
              type === 'diet'
                ? 'orange'
                : type === 'exercise'
                  ? 'blue'
                  : 'darkgreen'
            }
          />
          <Button
            buttonName="선택 날짜로 이동"
            onClick={() => {
              localStorage.setItem('date', selectedDate);
              navigator('/main');
            }}
            color={
              type === 'diet'
                ? 'orange'
                : type === 'exercise'
                  ? 'blue'
                  : 'darkgreen'
            }
          />
        </ButtonWrapper>
      </CalendarPageWrapper>
    </>
  );
};

export default CalendarPage;
