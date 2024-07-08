import { useNavigate, useLocation } from 'react-router-dom';
// import useAxios from '@/util/http-commons';
import { Box, IconButton } from '@/components';
import { Button, Header } from '@/components';
import FoodImage from '@/assets/images/마라탕.png';
import styled from 'styled-components';

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.orange};
  text-align: center;
  padding-bottom: 2.5rem;
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

const ImageBox = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.yellow};
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const ImageIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
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
  // const dietId = location.state.dietId;
  const category = decodeURI(location.pathname.split('/')[2]);

  // const foodList = useAxios.get(`/diet/${category}`, {data: dietId});
  const foodList = [
    {
      foodId: 11,
      foodName: '마라탕',
      brandName: '춘리마라탕',
      foodIntake: 700,
      foodCalories: 1000,
      carbohydrate: 10,
      sugars: 2,
      dietaryFiber: 1,
      protein: 1.4,
      fat: 20,
      saturatedFat: 15,
      transFat: 2,
      cholesterol: 15,
      sodium: 2000,
      potassium: 400,
      method: true,
    },
    {
      foodId: 22,
      foodName: '로티셰리바베큐 샌드위치',
      brandName: '서브웨이',
      foodIntake: 300,
      foodCalories: 410,
      carbohydrate: 10,
      sugars: 2,
      dietaryFiber: 1,
      protein: 1.4,
      fat: 20,
      saturatedFat: 15,
      transFat: 2,
      cholesterol: 15,
      sodium: 2000,
      potassium: 400,
      method: false,
    },
  ];

  const diet = {
    dietImg: FoodImage,
    totalCalories: 1410,
    totalCarbohydrate: 20,
    totalProtein: 2.8,
    totalFat: 40,
    foodList,
  };

  const goMain = () => {
    navigator('/main');
  };

  const registPhoto = () => {
    console.log('식단 사진 등록');
  };

  return (
    <>
      <SummaryWrapper>
        <Header iconName="back" onClick={goMain} nutritionButton={true} />
        <div>
          <Calorie>{diet.totalCalories} Kcal </Calorie>
          <Title> 먹었어요</Title>
        </div>
        <NutritionWrapper>
          <Nutrition>탄</Nutrition>
          <Gram>{diet.totalCarbohydrate} g</Gram>
          <Nutrition>단</Nutrition>
          <Gram>{diet.totalProtein} g</Gram>
          <Nutrition>지</Nutrition>
          <Gram style={{ paddingRight: '0' }}>{diet.totalFat} g</Gram>
        </NutritionWrapper>
        <ImageBox>
          <Image src={diet.dietImg} alt="salad" />
          <ImageIcon>
            <IconButton iconName="photo" onClick={registPhoto} />
          </ImageIcon>
        </ImageBox>
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
          <Box type="diet" info={food} key={food.foodId} />
        ))}
        <ButtonWrapper>
          <Button
            buttonName="검색"
            onClick={() => navigator('/diet/search', { state: { category } })}
          />
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
