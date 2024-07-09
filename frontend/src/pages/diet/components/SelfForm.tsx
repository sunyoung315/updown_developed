import { Button, Input } from '@/components';
import { formProps } from '@/types/type';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { useState } from 'react';
import styled from 'styled-components';

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

const SelfForm = (formProps: formProps) => {
  const { food, buttonName, category, foodId } = formProps;

  const [foodName, setFoodName] = useState<string>(food?.foodName || '');
  const [brandName, setBrandName] = useState<string>(food?.brandName || '');
  const [foodIntake, setFoodIntake] = useState<number>(food?.foodIntake || 0);
  const [calories, setCalories] = useState<number>(food?.calories || 0);
  const [carbohydrate, setCarbohydrate] = useState<number>(
    food?.carbohydrate || 0,
  );
  const [sugars, setSugars] = useState<number>(food?.sugars || 0);
  const [dietaryFiber, setDietaryFiber] = useState<number>(
    food?.dietaryFiber || 0,
  );
  const [protein, setProtein] = useState<number>(food?.protein || 0);
  const [fat, setFat] = useState<number>(food?.fat || 0);
  const [saturatedFat, setSaturatedFat] = useState<number>(
    food?.saturatedFat || 0,
  );
  const [transFat, setTransFat] = useState<number>(food?.transFat || 0);
  const [cholesterol, setCholesterol] = useState<number>(
    food?.cholesterol || 0,
  );
  const [sodium, setSodium] = useState<number>(food?.sodium || 0);
  const [potassium, setPotassium] = useState<number>(food?.potassium || 0);

  const newFood = {
    foodName,
    brandName,
    foodIntake,
    calories,
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
    method: false, // 직접 등록
  };

  const regDate = localStorage.getItem('date');

  const handleClick = async () => {
    if (buttonName === '등록하기') {
      try {
        console.log(newFood.calories);
        const response = await useAxios.post(`/diet/${category}`, {
          food: newFood,
          regDate,
        });
        if (response.status === httpStatusCode.OK) {
          console.log('식단 등록 성공');
        }
      } catch (error) {
        console.log('식단 등록 에러: ', error);
      }
    } else if (buttonName === '수정완료') {
      // foodId & newInfo 보내기
      console.log('newInfo', newFood);
      console.log('foodId', foodId);
    }
  };

  return (
    <InputWrapper>
      <Input
        inputDir="row"
        inputType="text"
        inputName="음식 이름"
        placeholder="음식 이름 (최대 20자)"
        isRequired={true}
        starColor="orange"
        onChange={setFoodName}
        value={foodName}
      />
      <Input
        inputDir="row"
        inputType="text"
        inputName="브랜드 이름"
        placeholder="브랜드 이름 (최대 20자)"
        onChange={setBrandName}
        value={brandName}
      />
      <Br />
      <Input
        inputDir="column"
        inputName="섭취량"
        isRequired={true}
        starColor="orange"
        unit="g"
        onChange={setFoodIntake}
        value={foodIntake}
      />
      <Text>( 입력하지 않은 정보는 0으로 저장됩니다. )</Text>
      <Input
        inputDir="column"
        inputName="칼로리"
        isRequired={true}
        starColor="orange"
        unit="kcal"
        onChange={setCalories}
        value={calories}
      />
      <Hr />
      <Input
        inputDir="column"
        inputName="탄수화물"
        isRequired={true}
        starColor="orange"
        unit="g"
        onChange={setCarbohydrate}
        value={carbohydrate}
      />
      <Input
        inputDir="column"
        inputName="당"
        inputNameColor="grey"
        unit="g"
        onChange={setSugars}
        value={sugars}
      />
      <Input
        inputDir="column"
        inputName="식이섬유"
        inputNameColor="grey"
        unit="g"
        onChange={setDietaryFiber}
        value={dietaryFiber}
      />
      <Hr />
      <Input
        inputDir="column"
        inputName="단백질"
        isRequired={true}
        starColor="orange"
        unit="g"
        onChange={setProtein}
        value={protein}
      />
      <Hr />
      <Input
        inputDir="column"
        inputName="지방"
        isRequired={true}
        starColor="orange"
        unit="g"
        onChange={setFat}
        value={fat}
      />
      <Input
        inputDir="column"
        inputName="포화지방"
        inputNameColor="grey"
        unit="g"
        onChange={setSaturatedFat}
        value={saturatedFat}
      />
      <Input
        inputDir="column"
        inputName="트랜스지방"
        inputNameColor="grey"
        unit="g"
        onChange={setTransFat}
        value={transFat}
      />
      <Hr />
      <Input
        inputDir="column"
        inputName="콜레스테롤"
        unit="mg"
        onChange={setCholesterol}
        value={cholesterol}
      />
      <Hr />
      <Input
        inputDir="column"
        inputName="나트륨"
        unit="mg"
        onChange={setSodium}
        value={sodium}
      />
      <Hr />
      <Input
        inputDir="column"
        inputName="칼륨"
        unit="mg"
        onChange={setPotassium}
        value={potassium}
      />
      <Br />
      <Button buttonName={buttonName} onClick={handleClick} color="orange" />
    </InputWrapper>
  );
};

export default SelfForm;
