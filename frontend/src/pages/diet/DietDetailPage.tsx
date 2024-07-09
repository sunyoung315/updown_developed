import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, Info, Button } from '@/components';
import useAxios from '@/util/http-commons';
import { food } from '@/types/type';
import styled from 'styled-components';

const DietDetailWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const InfoWrapper = styled.div`
  padding: 0.5rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Hr = styled.div`
  background-color: ${props => props.theme.grey};
  height: 0.1rem;
  border: none;
`;

const Br = styled.div`
  background-color: 'transparent';
  height: 0.13rem;
  border: none;
`;

const DietDetailPage = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const foodId = location.pathname.substring(13);

  const [food, setFood] = useState<food>();

  // 식단 상세 조회
  const getFoodInfo = async () => {
    try {
      const response = await useAxios.get('/diet/food', { params: { foodId } });
      setFood(response.data);
    } catch (err) {
      console.log('식단 상세 에러:', err);
    }
  };

  useEffect(() => {
    getFoodInfo();
  }, []);

  const goBack = () => {
    navigator(-1);
  };

  const editDiet = () => {
    navigator(`/diet/edit/${foodId}`, { state: { food } });
  };

  return (
    <DietDetailWrapper>
      <Header iconName="back" onClick={goBack} headerName="음식 조회" />
      <InfoWrapper>
        <Info
          infodir="row"
          title="음식 이름"
          content={food?.foodName}
          isRequired={true}
          starColor="orange"
        />
        <Info infodir="row" title="브랜드 이름" content={food?.brandName} />
        <Br />
        <Info
          title="섭취량"
          content={food?.foodIntake}
          isRequired={true}
          starColor="orange"
          unit="g"
        />
        <Info
          title="칼로리"
          content={food?.calories}
          isRequired={true}
          starColor="orange"
          unit="kcal"
        />
        <Hr />
        <Info
          title="탄수화물"
          content={food?.carbohydrate}
          isRequired={true}
          starColor="orange"
          unit="g"
        />
        <Info title="당" content={food?.sugars} unit="g" titleColor="grey" />
        <Info
          title="식이섬유"
          content={food?.dietaryFiber}
          unit="g"
          titleColor="grey"
        />
        <Hr />
        <Info
          title="단백질"
          content={food?.protein}
          isRequired={true}
          starColor="orange"
          unit="g"
        />
        <Hr />
        <Info
          title="지방"
          content={food?.fat}
          isRequired={true}
          starColor="orange"
          unit="g"
        />
        <Info
          title="포화지방"
          content={food?.saturatedFat}
          unit="g"
          titleColor="grey"
        />
        <Info
          title="트랜스지방"
          content={food?.transFat}
          unit="g"
          titleColor="grey"
        />
        <Hr />
        <Info title="콜레스테롤" content={food?.cholesterol} unit="mg" />
        <Hr />
        <Info title="나트륨" content={food?.sodium} unit="mg" />
        <Hr />
        <Info title="칼륨" content={food?.potassium} unit="mg" />
        <Br />
        <Button buttonName="수정하기" onClick={editDiet} color="orange" />
      </InfoWrapper>
    </DietDetailWrapper>
  );
};

export default DietDetailPage;
