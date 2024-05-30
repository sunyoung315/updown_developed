import { useNavigate, useLocation } from 'react-router-dom';
import { OneFood } from './components';
import BackIcon from '@/assets/icons/back-icon.svg';
import styled from 'styled-components';

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: auto 1 / 1;
  background-color: ${props => props.theme.orange};
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const NutritionButton = styled.button`
  width: 6rem;
  padding: 0.4rem;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.orange};
  font-size: 1rem;
  text-align: center;
  border-radius: 0.5rem;
`;

const Calorie = styled.span`
  font-size: 1.9rem;
  color: ${props => props.theme.white};
`;

const Title = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.black};
`;

const NutritionWrapper = styled.div`
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nutrition = styled.span`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.orange};
  font-size: 1rem;
  text-align: center;
  line-height: 1.25rem;
`;

const Gram = styled.span`
  font-size: 1.1rem;
  color: ${props => props.theme.white};
  padding-left: 0.6rem;
  padding-right: 1.8rem;
`;

const ImageWrapper = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.yellow};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 90%;
  margin: 5%;
`;

const FoodListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.7rem;
`;

const Category = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.black};
  padding-left: 0.5rem;
  padding-bottom: 1rem;
`;

const Count = styled.span`
  color: ${props => props.theme.orange};
`;

const DietPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const dietId = location.state.dietId;

  const goMain = () => {
    navigator('/main');
  };

  const openModal = () => {
    console.log('영양 성분 상세');
  };

  return (
    <>
      <SummaryWrapper>
        <Header>
          <button onClick={goMain}>
            <img src={BackIcon} alt="back" />
          </button>
          <NutritionButton onClick={openModal}>영양 성분 상세</NutritionButton>
        </Header>
        <div>
          <Calorie>1000 Kcal </Calorie>
          <Title> 먹었어요</Title>
        </div>
        <NutritionWrapper>
          <Nutrition>탄</Nutrition>
          <Gram>10 g</Gram>
          <Nutrition>단</Nutrition>
          <Gram>10 g</Gram>
          <Nutrition>지</Nutrition>
          <Gram style={{ paddingRight: '0' }}>10 g</Gram>
        </NutritionWrapper>
        <ImageWrapper>
          <Image src="/images/salad.png" alt="salad" />
        </ImageWrapper>
      </SummaryWrapper>
      <FoodListWrapper>
        <Category>
          점심 메뉴 <Count>1</Count>
        </Category>
        <OneFood />
      </FoodListWrapper>
    </>
  );
};

export default DietPage;
