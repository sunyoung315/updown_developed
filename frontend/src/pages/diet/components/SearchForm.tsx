import { Button, Info, Input } from '@/components';
import { formProps } from '@/types/type';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
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

const SearchForm = (formProps: formProps) => {
  const { food, buttonName, category, foodId } = formProps;

  const [foodIntake, setFoodIntake] = useState(food.foodIntake);
  const [foodCalories, setFoodCalories] = useState(food.foodCalories);
  const [carbohydrate, setCarbohydrate] = useState(food.carbohydrate);
  const [sugars, setSugars] = useState(food.sugars);
  const [dietaryFiber, setDietaryFiber] = useState(food.dietaryFiber);
  const [protein, setProtein] = useState(food.protein);
  const [fat, setFat] = useState(food.fat);
  const [saturatedFat, setSaturatedFat] = useState(food.saturatedFat);
  const [transFat, setTransFat] = useState(food.transFat);
  const [cholesterol, setCholesterol] = useState(food.cholesterol);
  const [sodium, setSodium] = useState(food.sodium);
  const [potassium, setPotassium] = useState(food.potassium);

  const newInfo = {
    foodName: food.foodName,
    brandName: food.brandName,
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
    method: true, // 검색 등록
  };

  useEffect(() => {
    setFoodCalories(
      Math.round((food.foodCalories / food.foodIntake) * foodIntake * 100) /
        100,
    );
    setCarbohydrate(
      Math.round((food.carbohydrate / food.foodIntake) * foodIntake * 100) /
        100,
    );
    setSugars(
      Math.round((food.sugars / food.foodIntake) * foodIntake * 100) / 100,
    );
    setDietaryFiber(
      Math.round((food.dietaryFiber / food.foodIntake) * foodIntake * 100) /
        100,
    );
    setProtein(
      Math.round((food.protein / food.foodIntake) * foodIntake * 100) / 100,
    );
    setFat((Math.round(food.fat / food.foodIntake) * foodIntake * 100) / 100);
    setSaturatedFat(
      Math.round((food.saturatedFat / food.foodIntake) * foodIntake * 100) /
        100,
    );
    setTransFat(
      Math.round((food.transFat / food.foodIntake) * foodIntake * 100) / 100,
    );
    setCholesterol(
      Math.round((food.cholesterol / food.foodIntake) * foodIntake * 100) / 100,
    );
    setTransFat(
      Math.round((food.transFat / food.foodIntake) * foodIntake * 100) / 100,
    );
    setTransFat(
      Math.round((food.transFat / food.foodIntake) * foodIntake * 100) / 100,
    );
  }, [foodIntake]);

  const handleClick = () => {
    if (buttonName === '등록하기') {
      // regDate & category & newInfo 보내기
      console.log('newInfo', newInfo);
      console.log('regDate', localStorage.getItem('date'));
      console.log('category', category);
    } else if (buttonName === '수정완료') {
      // foodId & newInfo 보내기
      console.log('newInfo', newInfo);
      console.log('foodId', foodId);
    }
  };

  return (
    <InputWrapper>
      <Info
        infodir="row"
        title="음식 이름"
        content={food?.foodName}
        isRequired={true}
        starColor="orange"
      />
      <Info infodir="row" title="브랜드 이름" content={food?.brandName} />
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
      <Info
        title="칼로리"
        content={foodCalories}
        isRequired={true}
        starColor="orange"
        unit="kcal"
      />
      <Hr />
      <Info
        title="탄수화물"
        content={carbohydrate}
        isRequired={true}
        starColor="orange"
        unit="g"
      />
      <Info title="당" content={sugars} unit="g" titleColor="grey" />
      <Info
        title="식이섬유"
        content={dietaryFiber}
        unit="g"
        titleColor="grey"
      />
      <Hr />
      <Info
        title="단백질"
        content={protein}
        isRequired={true}
        starColor="orange"
        unit="g"
      />
      <Hr />
      <Info
        title="지방"
        content={fat}
        isRequired={true}
        starColor="orange"
        unit="g"
      />
      <Info
        title="포화지방"
        content={saturatedFat}
        unit="g"
        titleColor="grey"
      />
      <Info title="트랜스지방" content={transFat} unit="g" titleColor="grey" />
      <Hr />
      <Info title="콜레스테롤" content={cholesterol} unit="mg" />
      <Hr />
      <Info title="나트륨" content={sodium} unit="mg" />
      <Hr />
      <Info title="칼륨" content={potassium} unit="mg" />
      <Br />
      <Button buttonName={buttonName} onClick={handleClick} />
    </InputWrapper>
  );
};

export default SearchForm;
