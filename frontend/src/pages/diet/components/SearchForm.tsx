import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Info, Input } from '@/components';
import { formProps } from '@/types/type';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import Swal from 'sweetalert2';
import theme from '@/styles/theme';
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
  const [calories, setCalories] = useState(food.calories);
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
    method: true,
  };

  useEffect(() => {
    setCalories(
      Math.round((food.calories / food.foodIntake) * foodIntake * 100) / 100,
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
    setSodium(
      Math.round((food.sodium / food.foodIntake) * foodIntake * 100) / 100,
    );
    setPotassium(
      Math.round((food.potassium / food.foodIntake) * foodIntake * 100) / 100,
    );
  }, [foodIntake]);

  const regDate = localStorage.getItem('date');

  const navigator = useNavigate();

  const handleClick = async () => {
    // 섭취량이 0이면 리턴(공백제거 후 검사)
    if (foodIntake === 0)
      return Swal.fire({
        text: '섭취량을 입력해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['orange'],
      });

    if (buttonName === '등록하기') {
      try {
        const response = await useAxios.post(`/diet/${category}`, {
          food: newInfo,
          regDate,
        });
        if (response.status === httpStatusCode.OK) {
          const dietId = response.data;
          navigator(`/diet/${category}`, { state: { dietId } });
        }
      } catch (err) {
        console.log('식단 등록 에러: ', err);
      }
    } else if (buttonName === '수정완료') {
      try {
        const response = await useAxios.put(`/diet/${foodId}`, newInfo);
        if (response.status === httpStatusCode.OK) {
          navigator(`/diet/detail/${foodId}`, { state: { category } });
        }
      } catch (err) {
        console.log('식단 수정 에러: ', err);
      }
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
        content={calories}
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
      <Button buttonName={buttonName} onClick={handleClick} color="orange" />
    </InputWrapper>
  );
};

export default SearchForm;
