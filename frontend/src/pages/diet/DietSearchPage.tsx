import { Header, SearchResult } from '@/components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FoodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2rem 3.25rem 2rem;
`;

const DietSearchPage = () => {
  const navigator = useNavigate();

  const location = useLocation();

  const category = location.state.category;
  const dietId = location.state.dietId;

  const goBack = () => {
    navigator(`/diet/${category}`, { state: { dietId } });
  };

  const [foodName, setFoodName] = useState('');

  const searchFood = () => {
    console.log(foodName);
    // 검색 axios
  };

  const foodList = [
    {
      foodInfoId: 1,
      foodInfoName: '김치만두',
      brandName: '비비고',
      foodInfoCalories: 180,
      carbohydrate: 20,
      sugars: 15,
      dietaryFiber: 0,
      protein: 3,
      fat: 4,
      saturatedFat: 0,
      transFat: 1,
      cholesterol: 1,
      sodium: 223,
      potassium: 333,
    },
  ];

  return (
    <div>
      <Header
        iconName="back"
        onClick={goBack}
        search={true}
        placeholder="어떤 음식을 드셨나요?"
        onChange={setFoodName}
        searchFood={searchFood}
      />
      <FoodList>
        {foodList.map(food => (
          <SearchResult
            result={food}
            type="diet"
            category={category}
            key={food.foodInfoId}
            dietId={dietId}
          />
        ))}
      </FoodList>
    </div>
  );
};

export default DietSearchPage;
