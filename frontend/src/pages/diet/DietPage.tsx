import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxios from '@/util/http-commons';
import { Box, IconButton } from '@/components';
import { Button, Header } from '@/components';
import { nutritionProps, foodInfo } from '@/types/type';
import { httpStatusCode } from '@/util/http-status';
import styled from 'styled-components';
import BottomSheet from '@/components/BottomSheet';

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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
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

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 2rem;
`;

const DietPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const dietId = location.state.dietId || 0;
  const category = decodeURI(location.pathname.split('/')[2]) as
    | 'BREAKFAST'
    | 'LUNCH'
    | 'DINNER'
    | 'SNACK';
  const regDate = localStorage.getItem('date');

  const [dietImg, setDietImg] = useState<string>();
  const [nutrition, setNutrition] = useState<nutritionProps>();
  const [foodList, setFoodList] = useState<foodInfo[]>();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  // 식사별 식단 리스트 조회
  const getDietInfo = async () => {
    try {
      const response = await useAxios.get(`/diet/${category}`, {
        params: { regDate },
      });

      // 아직 등록되지 않은 식단인 경우
      if (response.status === httpStatusCode.OK) {
        setDietImg(response.data.dietImg);
        setNutrition(response.data.nutrition);
        setFoodList(response.data.foodList);
      } else if (response.status === httpStatusCode.NOCONTENT) {
        // foodList의 마지막 요소가 지워진 상태 => 정보 초기화
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
    setIsDeleted(false);
  }, [isDeleted]);

  const goMain = () => {
    navigator('/main');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // 버튼을 눌렀을 때 input 클릭
  const onClickImageUploadHandler = (): void => {
    console.log('여기 옴?');
    imageInputRef.current?.click();
  };

  // 식단 사진 등록
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // 백엔드에서 MultipartFile로 파일을 받기 위해서는 FormData로 감싸서 보내기
      // FormData객체는 key-value 쌍으로 저장
      const formData = new FormData();
      formData.append('dietImg', file);

      const regDate = localStorage.getItem('date');
      if (regDate) formData.append('regDate', regDate);

      try {
        const response = await useAxios.post(
          `/diet/img/${category}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.status === httpStatusCode.OK) {
          getDietInfo();
          closeModal();
        }
      } catch (err) {
        console.log('식단 사진 등록 에러:', err);
      }
    }
  };

  // 식단 사진 삭제
  const deleteImage = async () => {
    try {
      const response = await useAxios.delete(`/diet/img/${regDate}`, {
        params: { category },
      });

      if (response.status === httpStatusCode.OK) {
        getDietInfo();
        closeModal();
      }
    } catch (err) {
      console.log('식단 사진 삭제 에러:', err);
    }
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
            <IconButton
              iconName="photo"
              onClick={dietImg ? openModal : onClickImageUploadHandler}
            />
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: 'none' }}
              onChange={uploadImage}
            />
            <BottomSheet isOpen={isOpen} onClose={closeModal} noModal={true}>
              <ButtonBox>
                <Button
                  buttonName="사진 보관함"
                  color="orange"
                  radius={0}
                  dir="top"
                  onClick={onClickImageUploadHandler}
                />
                <Button
                  buttonName="삭제하기"
                  color="orange"
                  radius={0}
                  dir="bottom"
                  onClick={deleteImage}
                />
              </ButtonBox>
            </BottomSheet>
          </ImageIcon>
        </ImageBox>
      </SummaryWrapper>
      <FoodListWrapper>
        <Category>
          {category == 'BREAKFAST'
            ? '아침'
            : category == 'LUNCH'
              ? '점심'
              : category == 'DINNER'
                ? '저녁'
                : '간식'}{' '}
          메뉴 <Count>{foodList?.length || 0}</Count>
        </Category>
        {foodList?.map((food: foodInfo) => (
          <Box
            type="diet"
            info={food}
            key={food.foodId}
            setRefreshed={setIsDeleted}
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
