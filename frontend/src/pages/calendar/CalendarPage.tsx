import { useEffect, useState } from 'react';
import { Box, ButtonRadio, Calendar, Header } from './components';
import styled from 'styled-components';
import { format } from 'date-fns';

const CalendarPageWrapper = styled.div`
  margin: 0.5rem 1.5rem 4.75rem;
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

const CalendarPage = () => {
  const date = localStorage.getItem('date');

  // 달력의 년, 월
  const [year, setYear] = useState<number>(Number(date?.substring(0, 4)) || 0);
  const [month, setMonth] = useState<number>(
    Number(date?.substring(5, 7)) || 0,
  );
  // 달력에 표시될 정보 종류
  const [type, setType] = useState<'diet' | 'exercise' | 'weight'>('diet');
  // 달력에서 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<string>(
    date || format(new Date(), 'yyyy-MM-dd'),
  );
  // 선택한 날짜의 정보
  const [selectedInfo, setSelectedInfo] = useState<any>([]);
  // 해당 년월에 정보가 있는 날짜 리스트
  const [dateList, setDateList] = useState<string[]>([]);

  const typeList = ['diet', 'exercise', 'weight'];

  // 달력에 표시될 정보 종류(diet, exercise, weight) 선택
  const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as 'diet' | 'exercise' | 'weight');
  };

  const dietData = [
    {
      dietId: 1,
      category: 'BREAKFAST',
      totalCalories: 320.0,
      regDate: '2024-07-01',
      foodList: [
        {
          foodId: 1,
          foodName: '마라탕',
          foodIntake: 120,
          calories: 140,
        },
        {
          foodId: 2,
          foodName: '김치만두',
          foodIntake: 56,
          calories: 200,
        },
      ],
    },
    {
      dietId: 2,
      category: 'LUNCH',
      totalCalories: 500.0,
      regDate: '2024-07-01',
      foodList: [
        {
          foodId: 3,
          foodName: '불닭볶음면',
          foodIntake: 100,
          calories: 300,
        },
        { foodId: 4, foodName: '샐러드', foodIntake: 219, calories: 200 },
      ],
    },
    {
      dietId: 3,
      category: 'DINNER',
      totalCalories: 500.0,
      regDate: '2024-07-02',
      foodList: [
        { foodId: 5, foodName: '스테이크', foodIntake: 230, calories: 400 },
        {
          foodId: 6,
          foodName: '싸이버거',
          foodIntake: 42,
          calories: 100,
        },
      ],
    },
  ];

  const exerciseData = [
    {
      exerciseId: 1,
      exerciseName: '달리기',
      exerciseTime: 60,
      caloriesBurned: 324,
      regDate: '2024-07-27',
      setList: [
        {
          exerciseSetId: 1,
          exerciseCount: 0,
          exerciseWeight: 0,
          exerciseDistance: 1.5,
        },
        {
          exerciseSetId: 2,
          exerciseCount: 0,
          exerciseWeight: 0,
          exerciseDistance: 1.8,
        },
      ],
    },
    {
      exerciseId: 2,
      exerciseName: '아령 들기',
      exerciseTime: 30,
      caloriesBurned: 214,
      regDate: '2024-07-27',
      setList: [
        {
          exerciseSetId: 3,
          exerciseCount: 10,
          exerciseWeight: 3,
          exerciseDistance: 0,
        },
        {
          exerciseSetId: 4,
          exerciseCount: 15,
          exerciseWeight: 5,
          exerciseDistance: 0,
        },
      ],
    },
    {
      exerciseId: 3,
      exerciseName: '팔굽혀펴기',
      exerciseTime: 45,
      caloriesBurned: 168,
      regDate: '2024-07-24',
      setList: [
        {
          exerciseSetId: 5,
          exerciseCount: 24,
          exerciseWeight: 0,
          exerciseDistance: 0,
        },
        {
          exerciseSetId: 6,
          exerciseCount: 12,
          exerciseWeight: 0,
          exerciseDistance: 0,
        },
      ],
    },
  ];

  const weightData = [
    {
      weightId: 1,
      weight: 106.4,
      targetWeight: 51.2,
      regDate: '2024-07-11',
    },
    {
      weightId: 2,
      weight: 53.2,
      targetWeight: 51.2,
      regDate: '2024-07-16',
    },
    {
      weightId: 1,
      weight: 52.5,
      targetWeight: 51.2,
      regDate: '2024-07-27',
    },
  ];

  useEffect(() => {
    // 선택된 날짜에 대한 정보 갱신
    if (type === 'diet')
      setSelectedInfo(dietData.filter(d => d.regDate === selectedDate));
    else if (type === 'exercise')
      setSelectedInfo(exerciseData.filter(e => e.regDate === selectedDate));
    else if (type === 'weight')
      setSelectedInfo(weightData.filter(w => w.regDate === selectedDate));
  }, [selectedDate, type]);

  useEffect(() => {
    // 선택한 년월에 정보가 있는 날짜 리스트 갱신
    if (type === 'diet') {
      const infoDates = new Set(dietData.map(d => d.regDate));
      setDateList([...infoDates]);
    } else if (type === 'exercise') {
      const infoDates = new Set(exerciseData.map(e => e.regDate));
      setDateList([...infoDates]);
    } else if (type === 'weight') {
      const infoDates = new Set(weightData.map(w => w.regDate));
      setDateList([...infoDates]);
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
      </CalendarPageWrapper>
    </>
  );
};

export default CalendarPage;
