import { Button, Input } from '@/components';
import { formProps } from '@/types/type';
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

  const [foodName, setFoodName] = useState(food?.foodName);
  const [brandName, setBrandName] = useState(food?.brandName);
  const [foodIntake, setFoodIntake] = useState(food?.foodIntake);
  const [foodCalories, setFoodCalories] = useState(food?.foodCalories);
  const [carbohydrate, setCarbohydrate] = useState(food?.carbohydrate);
  const [sugars, setSugars] = useState(food?.sugars);
  const [dietaryFiber, setDietaryFiber] = useState(food?.dietaryFiber);
  const [protein, setProtein] = useState(food?.protein);
  const [fat, setFat] = useState(food?.fat);
  const [saturatedFat, setSaturatedFat] = useState(food?.saturatedFat);
  const [transFat, setTransFat] = useState(food?.transFat);
  const [cholesterol, setCholesterol] = useState(food?.cholesterol);
  const [sodium, setSodium] = useState(food?.sodium);
  const [potassium, setPotassium] = useState(food?.potassium);

  const newFood = {
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
    method: false, // 직접 등록
  };

  const handleClick = () => {
    if (buttonName === '등록하기') {
      // regDate & category & newInfo 보내기
      console.log('newInfo', newFood);
      console.log('regDate', localStorage.getItem('date'));
      console.log('category', category);
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
        onChange={setFoodCalories}
        value={foodCalories}
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
      <Button buttonName={buttonName} onClick={handleClick} />
    </InputWrapper>
  );
};

export default SelfForm;
