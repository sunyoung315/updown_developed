import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxios from '@/util/http-commons';
import { Box, IconButton } from '@/components';
import { Button, Header } from '@/components';
import { nutritionProps, foodInfo } from '@/types/type';
import { httpStatusCode } from '@/util/http-status';
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
  const dietId = location.state.dietId || 0;
  const category = decodeURI(location.pathname.split('/')[2]);

  const [dietImg, setDietImg] = useState<string>();
  const [nutrition, setNutrition] = useState<nutritionProps>();
  const [foodList, setFoodList] = useState<foodInfo[]>();
  const [isDeleted, setIsDelted] = useState<boolean>(false);

  // 식사별 식단 리스트 조회
  const getDietInfo = async () => {
    try {
      const response = await useAxios.get(`/diet/${category}`, {
        params: { dietId },
      });

      // 아직 등록되지 않은 식단인 경우
      if (response.status === httpStatusCode.OK) {
        console.log('식사별 식단 리스트 조회 성공');
        setDietImg(response.data.dietImg);
        setNutrition(response.data.nutrition);
        setFoodList(response.data.foodList);
      } else if (response.status === httpStatusCode.NOCONTENT) {
        setFoodList(undefined);
        setDietImg(undefined);
        setNutrition(undefined);
      }
    } catch (err) {
      console.log('식사별 식단 리스트 조회 에러:', err);
    }
  };

  useEffect(() => {
    getDietInfo();
    setIsDelted(false);
  }, [isDeleted]);

  const goMain = () => {
    navigator('/main');
  };

  const registPhoto = () => {
    console.log('식단 사진 등록');
  };

  return (
    <>
      <SummaryWrapper>
        <Header
          iconName="back"
          onClick={goMain}
          nutritionButton={true}
          nutrition={nutrition}
        />
        <div>
          <Calorie>{nutrition?.totalCalories || 0} Kcal </Calorie>
          <Title> 먹었어요</Title>
        </div>
        <NutritionWrapper>
          <Nutrition>탄</Nutrition>
          <Gram>{nutrition?.totalCarbohydrate || 0} g</Gram>
          <Nutrition>단</Nutrition>
          <Gram>{nutrition?.totalProtein || 0} g</Gram>
          <Nutrition>지</Nutrition>
          <Gram style={{ paddingRight: '0' }}>
            {nutrition?.totalFat || 0} g
          </Gram>
        </NutritionWrapper>
        <ImageBox>
          <Image
            src={dietImg ? dietImg : `/images/${category}.png`}
            alt="dietImg"
          />
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
          메뉴 <Count>{foodList?.length || 0}</Count>
        </Category>
        {foodList?.map((food: foodInfo) => (
          <Box
            type="diet"
            info={food}
            key={food.foodId}
            setIsDelted={setIsDelted}
            dietId={dietId}
            category={category}
          />
        ))}
        <ButtonWrapper>
          <Button
            buttonName="검색"
            onClick={() =>
              navigator('/diet/search', { state: { category, dietId } })
            }
            color="orange"
          />
          <Button
            buttonName="직접 등록"
            onClick={() =>
              navigator('/diet/regist', { state: { category, dietId } })
            }
            color="orange"
          />
        </ButtonWrapper>
      </FoodListWrapper>
    </>
  );
};

export default DietPage;
