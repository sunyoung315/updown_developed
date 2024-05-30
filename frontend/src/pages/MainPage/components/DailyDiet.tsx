import { useState } from 'react';
import OneDiet from './OneDiet';
import styled from 'styled-components';

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

const DailyDiet = () => {
  const [breakfast, setBreakfast] = useState({
    dietId: 0,
    category: '아침',
    dietImg: 'pouring',
    totalCalories: 100.0,
    isFast: false,
  });

  const [lunch, setLunch] = useState({
    dietId: 0,
    category: '점심',
    dietImg: 'rice',
    totalCalories: 200.0,
    isFast: false,
  });

  const [dinner, setDinner] = useState({
    dietId: 0,
    category: '저녁',
    dietImg: 'salad',
    totalCalories: 300.0,
    isFast: false,
  });

  const [snack, setSnack] = useState({
    dietId: 0,
    category: '간식',
    dietImg: 'juice',
    totalCalories: 400.0,
    isFast: false,
  });

  return (
    <DailyDietWrapper>
      <TitleWrapper>식단</TitleWrapper>
      <DietWrapper>
        <OneDiet diet={breakfast} />
        <OneDiet diet={lunch} />
        <OneDiet diet={dinner} />
        <OneDiet diet={snack} />
      </DietWrapper>
    </DailyDietWrapper>
  );
};

export default DailyDiet;
