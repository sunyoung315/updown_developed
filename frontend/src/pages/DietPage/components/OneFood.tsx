import CloseBtn from '@/assets/icons/close-icon.svg';
import styled from 'styled-components';

const OneFoodWrapper = styled.div`
  width: 100%;
  height: 6rem;
  background-color: ${props => props.theme.white};
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 1.1rem;
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

const OneFood = () => {
  return (
    <OneFoodWrapper>
      <TopWrapper>
        <FoodName>마라탕</FoodName>
        <button>
          <img src={CloseBtn} alt="close" />
        </button>
      </TopWrapper>
      <BottomWrapper>
        <FoodInfo>
          <BrandName>
            춘리마라탕 &nbsp;<Amount>1인분 (700g)</Amount>
          </BrandName>
        </FoodInfo>
        <Calorie>625 Kcal</Calorie>
      </BottomWrapper>
    </OneFoodWrapper>
  );
};

export default OneFood;
