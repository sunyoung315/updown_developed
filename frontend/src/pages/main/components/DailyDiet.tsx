import { useEffect, useState } from 'react';
import OneDiet from './OneDiet';
import styled from 'styled-components';
import useAxios from '@/util/http-commons';
import { Diet, dietProps } from '@/types/type';

const DailyDietWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: ${props => props.theme.yellow};
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  font-size: 1.25rem;
`;

const DietWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.3rem;
  column-gap: 1.3rem;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
`;

const DailyDiet = ({ regDate }: { regDate: string }) => {
  const [todayDiet, setTodayDiet] = useState<Diet[]>([]);
  const [breakfastFast, setBreakfastFast] = useState<boolean>(false);
  const [lunchFast, setLunchFast] = useState<boolean>(false);
  const [dinnerFast, setDinnerFast] = useState<boolean>(false);
  const [snackFast, setSnackFast] = useState<boolean>(false);

  const getTodayDiet = async () => {
    try {
      const response = await useAxios.get('/diet', {
        params: { regDate },
      });
      setTodayDiet(response.data);

      const diets = response.data;
      const breakfast = diets?.find(
        (diet: Diet) => diet.category === 'breakfast',
      );
      const lunch = diets?.find((diet: Diet) => diet.category === 'lunch');
      const dinner = diets?.find((diet: Diet) => diet.category === 'dinner');
      const snack = diets?.find((diet: Diet) => diet.category === 'snack');

      setBreakfastFast(breakfast?.isFast || false);
      setLunchFast(lunch?.isFast || false);
      setDinnerFast(dinner?.isFast || false);
      setSnackFast(snack?.isFast || false);
      console.log(dinnerFast);
    } catch (err) {
      console.log('일별 식단 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getTodayDiet();
  }, [regDate]);

  const handleFastChange = async (category: string, value: boolean) => {
    switch (category) {
      case 'breakfast':
        setBreakfastFast(value);
        break;
      case 'lunch':
        setLunchFast(value);
        break;
      case 'dinner':
        setDinnerFast(value);
        break;
      case 'snack':
        setSnackFast(value);
        break;
      default:
        break;
    }
    getTodayDiet();
  };

  return (
    <DailyDietWrapper>
      <TitleWrapper>식단</TitleWrapper>
      <DietWrapper>
        <OneDiet
          diet={todayDiet.find(diet => diet.category === 'breakfast')}
          category="breakfast"
          regDate={regDate}
          fast={breakfastFast}
          setFast={(value: boolean) => handleFastChange('breakfast', value)}
        />
        <OneDiet
          diet={todayDiet.find(diet => diet.category === 'lunch')}
          category="lunch"
          regDate={regDate}
          fast={lunchFast}
          setFast={(value: boolean) => handleFastChange('lunch', value)}
        />
        <OneDiet
          diet={todayDiet.find(diet => diet.category === 'dinner')}
          category="dinner"
          regDate={regDate}
          fast={dinnerFast}
          setFast={(value: boolean) => handleFastChange('dinner', value)}
        />
        <OneDiet
          diet={todayDiet.find(diet => diet.category === 'snack')}
          category="snack"
          regDate={regDate}
          fast={snackFast}
          setFast={(value: boolean) => handleFastChange('snack', value)}
        />
      </DietWrapper>
    </DailyDietWrapper>
  );
};

export default DailyDiet;
