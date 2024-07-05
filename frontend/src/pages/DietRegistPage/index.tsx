import { Button, Header } from '@/components';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DietRegistWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const InputWrapper = styled.div`
  padding: 0.5rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Text = styled.div`
  text-align: center;
  color: ${props => props.theme.grey};
  font-size: 0.94rem;
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

const DietRegistPage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const category = location.state.category;

  const goBack = () => {
    navigator(-1);
  };

  const [foodName, setFoodName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [foodIntake, setFoodIntake] = useState(0);
  const [foodCalories, setFoodCalories] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [sugars, setSugars] = useState(0);
  const [dietaryFiber, setDietaryFiber] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [saturatedFat, setSaturatedFat] = useState(0);
  const [transFat, setTransFat] = useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [potassium, setPotassium] = useState(0);

  const foodInfo = {
    foodName,
    brandName,
    foodIntake,
    foodCalories,
    carbohydrate,
    sugars,
    dietaryFiber,
    protein,
    fat,
    saturatedFat,
    transFat,
    cholesterol,
    sodium,
    potassium,
  };

  const registDiet = () => {
    console.log(foodInfo);
  };

  return (
    <DietRegistWrapper>
      <Header onClick={goBack} headerName="음식 직접 등록" />
      <InputWrapper>
        <Input
          inputDir="row"
          inputType="text"
          inputName="음식 이름"
          placeholder="음식 이름 (최대 20자)"
          isRequired={true}
          starColor="orange"
          onChange={setFoodName}
        />
        <Input
          inputDir="row"
          inputType="text"
          inputName="브랜드 이름"
          placeholder="브랜드 이름 (최대 20자)"
          onChange={setBrandName}
        />
        <Br />
        <Input
          inputDir="column"
          inputName="1회 제공량"
          isRequired={true}
          starColor="orange"
          unit="g"
          onChange={setFoodIntake}
        />
        <Text>( 입력하지 않은 정보는 0으로 저장됩니다. )</Text>
        <Input
          inputDir="column"
          inputName="칼로리"
          isRequired={true}
          starColor="orange"
          unit="kcal"
          onChange={setFoodCalories}
        />
        <Hr />
        <Input
          inputDir="column"
          inputName="탄수화물"
          isRequired={true}
          starColor="orange"
          unit="g"
          onChange={setCarbohydrate}
        />
        <Input
          inputDir="column"
          inputName="당"
          inputNameColor="grey"
          unit="g"
          onChange={setSugars}
        />
        <Input
          inputDir="column"
          inputName="식이섬유"
          inputNameColor="grey"
          unit="g"
          onChange={setDietaryFiber}
        />
        <Hr />
        <Input
          inputDir="column"
          inputName="단백질"
          isRequired={true}
          starColor="orange"
          unit="g"
          onChange={setProtein}
        />
        <Hr />
        <Input
          inputDir="column"
          inputName="지방"
          isRequired={true}
          starColor="orange"
          unit="g"
          onChange={setFat}
        />
        <Input
          inputDir="column"
          inputName="포화지방"
          inputNameColor="grey"
          unit="g"
          onChange={setSaturatedFat}
        />
        <Input
          inputDir="column"
          inputName="트랜스지방"
          inputNameColor="grey"
          unit="g"
          onChange={setTransFat}
        />
        <Hr />
        <Input
          inputDir="column"
          inputName="콜레스테롤"
          unit="mg"
          onChange={setCholesterol}
        />
        <Input
          inputDir="column"
          inputName="나트륨"
          unit="mg"
          onChange={setSodium}
        />
        <Input
          inputDir="column"
          inputName="칼륨"
          unit="mg"
          onChange={setPotassium}
        />
        <Br />
        <Button buttonName="등록하기" onClick={registDiet} />
      </InputWrapper>
    </DietRegistWrapper>
  );
};

export default DietRegistPage;
