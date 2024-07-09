import { useEffect, useState } from 'react';
import OneDiet from './OneDiet';
import styled from 'styled-components';
import useAxios from '@/util/http-commons';
import { Diet } from '@/types/type';

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

  const getTodayDiet = async () => {
    try {
      const response = await useAxios.get('/diet', {
        params: { regDate },
      });
      setTodayDiet(response.data);
    } catch (err) {
      console.log('일별 식단 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getTodayDiet();
  }, [regDate]);

  const breakfast = todayDiet?.find(diet => diet.category === 'breakfast');
  const lunch = todayDiet?.find(diet => diet.category === 'lunch');
  const dinner = todayDiet?.find(diet => diet.category === 'dinner');
  const snack = todayDiet?.find(diet => diet.category === 'snack');

  return (
    <DailyDietWrapper>
      <TitleWrapper>식단</TitleWrapper>
      <DietWrapper>
        <OneDiet diet={breakfast} title="breakfast" regDate={regDate} />
        <OneDiet diet={lunch} title="lunch" regDate={regDate} />
        <OneDiet diet={dinner} title="dinner" regDate={regDate} />
        <OneDiet diet={snack} title="snack" regDate={regDate} />
      </DietWrapper>
    </DailyDietWrapper>
  );
};

export default DailyDiet;
