import { Header } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

const DietSearchPage = () => {
  const navigator = useNavigate();

  const goBack = () => {
    navigator(-1);
  };

  const [foodName, setFoodName] = useState('');

  const searchFood = () => {
    console.log(foodName);
    // 검색 axios
  };

  return (
    <div>
      <Header
        onClick={goBack}
        search={true}
        placeholder="어떤 음식을 드셨나요?"
        onChange={setFoodName}
        searchFood={searchFood}
      />
    </div>
  );
};

export default DietSearchPage;
