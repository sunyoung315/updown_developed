import { useNavigate } from 'react-router-dom';
import CloseBtn from '@/assets/icons/close-icon.svg';
import styled from 'styled-components';
import { foodProps } from '@/types/type';
import { BottomNav } from '@/components';

const OneFoodWrapper = styled.div`
  width: 100%;
  height: 6rem;
  background-color: ${props => props.theme.white};
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 1.1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const FoodName = styled.span`
  font-size: 1.6rem;
  padding: 0.2rem;
  color: ${props => props.theme.black};
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const FoodInfo = styled.div`
  display: inline-block;
  gap: 0.5rem;
`;

const BrandName = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.black};
`;

const Amount = styled.span`
  color: ${props => props.theme.grey};
`;

const Calorie = styled.span`
  font-size: 1.7rem;
  color: ${props => props.theme.black};
`;

const OneFood = ({ food }: { food: foodProps }) => {
  const { foodId, foodName, brandName, foodIntake, foodCalories } = food;

  const navigator = useNavigate();
  const goFoodDetail = () => {
    navigator(`/diet/food/${foodId}`);
  };

  const deleteFood = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation(); // 이벤트 전파 중단
    console.log('음식 삭제');
  };

  return (
    <OneFoodWrapper onClick={goFoodDetail}>
      <TopWrapper>
        <FoodName>{foodName}</FoodName>
        <button onClick={event => deleteFood(event)}>
          <img src={CloseBtn} alt="close" />
        </button>
      </TopWrapper>
      <BottomWrapper>
        <FoodInfo>
          <BrandName>
            {brandName} &nbsp;<Amount>{foodIntake}</Amount>
          </BrandName>
        </FoodInfo>
        <Calorie>{foodCalories} Kcal</Calorie>
      </BottomWrapper>
    </OneFoodWrapper>
  );
};

export default OneFood;
