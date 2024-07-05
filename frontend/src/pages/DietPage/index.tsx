import { useNavigate, useLocation } from 'react-router-dom';
// import useAxios from '@/util/http-commons';
import { OneFood } from './components';
import { Button, Header } from '@/components';
import styled from 'styled-components';

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: auto 1 / 1;
  background-color: ${props => props.theme.orange};
  text-align: center;
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
  padding: 1.7rem 1.7rem 3.25rem;
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

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.3rem;
  column-gap: 1.3rem;
  padding: 1rem 0 1rem;
`;

const DietPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const dietId = location.state.dietId;
  const category = decodeURI(location.pathname.split('/')[2]);

  // const foodList = useAxios.get(`/diet/${category}`, {data: dietId});
  const foodList = [
    {
      foodId: 1,
      foodName: '마라탕',
      brandName: '춘리마라탕',
      foodIntake: '700g',
      foodCalories: 625,
    },
    {
      foodId: 2,
      foodName: '로티셰리바베큐 샌드위치',
      brandName: '서브웨이',
      foodIntake: '300g',
      foodCalories: 410,
    },
  ];

  const goMain = () => {
    navigator('/main');
  };

  return (
    <>
      <SummaryWrapper>
        <Header onClick={goMain} nutritionButton={true} />
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
          {category == 'breakfast'
            ? '아침'
            : category == 'lunch'
              ? '점심'
              : category == 'dinner'
                ? '저녁'
                : '간식'}{' '}
          메뉴 <Count>{foodList.length}</Count>
        </Category>
        {foodList.map(food => (
          <OneFood food={food} key={food.foodId} />
        ))}
        <ButtonWrapper>
          <Button buttonName="검색" onClick={() => navigator('/diet/search')} />
          <Button
            buttonName="직접 등록"
            onClick={() => navigator('/diet/regist', { state: { category } })}
          />
        </ButtonWrapper>
      </FoodListWrapper>
    </>
  );
};

export default DietPage;
