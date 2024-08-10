import { useEffect, useState } from 'react';
import OneDiet from './OneDiet';
import styled from 'styled-components';
import useAxios from '@/util/http-commons';
import { format } from 'date-fns';
import { Diet } from '@/types/type';
import { httpStatusCode } from '@/util/http-status';

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
  font-size: 1.4rem;
`;

const DietWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.3rem;
  column-gap: 1.3rem;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
`;

const DailyDiet = () => {
  const regDate = localStorage.getItem('date');

  const [todayDiet, setTodayDiet] = useState<Diet[]>([]);
  const [breakfastFast, setBreakfastFast] = useState<boolean>(false);
  const [lunchFast, setLunchFast] = useState<boolean>(false);
  const [dinnerFast, setDinnerFast] = useState<boolean>(false);
  const [snackFast, setSnackFast] = useState<boolean>(false);

  const getTodayDiet = async () => {
    try {
      const response = await useAxios.get(`/diet/daily/${regDate}`);

      if (response.status === httpStatusCode.OK) {
        console.log(response.data);
        setTodayDiet(response.data);

        const diets = response.data;
        const breakfast = diets?.find(
          (diet: Diet) => diet.category === 'BREAKFAST',
        );
        const lunch = diets?.find((diet: Diet) => diet.category === 'LUNCH');
        const dinner = diets?.find((diet: Diet) => diet.category === 'DINNER');
        const snack = diets?.find((diet: Diet) => diet.category === 'SNACK');

        setBreakfastFast(breakfast?.isFast || false);
        setLunchFast(lunch?.isFast || false);
        setDinnerFast(dinner?.isFast || false);
        setSnackFast(snack?.isFast || false);
      }
    } catch (err) {
      console.log('일별 식단 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getTodayDiet();
  }, [regDate]);

  const handleFastChange = async (
    category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK',
    value: boolean,
  ) => {
    switch (category) {
      case 'BREAKFAST':
        setBreakfastFast(value);
        break;
      case 'LUNCH':
        setLunchFast(value);
        break;
      case 'DINNER':
        setDinnerFast(value);
        break;
      case 'SNACK':
        setSnackFast(value);
        break;
      default:
        break;
    }
    getTodayDiet();
  };

  const category: Array<'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK'> = [
    'BREAKFAST',
    'LUNCH',
    'DINNER',
    'SNACK',
  ];

  return (
    <DailyDietWrapper>
      <TitleWrapper>식단</TitleWrapper>
      <DietWrapper>
        {category.map(c => (
          <OneDiet
            key={c}
            diet={todayDiet?.find(diet => diet.category === c)}
            category={c}
            regDate={regDate || format(new Date(), 'yyyy-MM-dd')}
            fast={
              c === 'BREAKFAST'
                ? breakfastFast
                : c === 'LUNCH'
                  ? lunchFast
                  : c === 'DINNER'
                    ? dinnerFast
                    : snackFast
            }
            setFast={(value: boolean) => handleFastChange(c, value)}
          />
        ))}
      </DietWrapper>
    </DailyDietWrapper>
  );
};

export default DailyDiet;
