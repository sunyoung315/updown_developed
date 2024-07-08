import { Header } from '@/components';
import { SearchForm, SelfForm } from './components';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DietRegistWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const DietRegistPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const category = location.state.category;
  const foodInfo = location.state.foodInfo;

  const goBack = () => {
    navigator(-1);
  };

  const food = {
    foodName: '',
    brandName: '',
    foodIntake: 0,
    foodCalories: 0,
    carbohydrate: 0,
    sugars: 0,
    dietaryFiber: 0,
    protein: 0,
    fat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
  };

  return (
    <DietRegistWrapper>
      {foodInfo ? (
        <>
          <Header
            iconName="back"
            onClick={goBack}
            headerName="음식 검색 등록"
          />
          <SearchForm
            food={foodInfo}
            buttonName="등록하기"
            category={category}
          />
        </>
      ) : (
        <>
          <Header
            iconName="back"
            onClick={goBack}
            headerName="음식 직접 등록"
          />
          <SelfForm food={food} buttonName="등록하기" category={category} />
        </>
      )}
    </DietRegistWrapper>
  );
};

export default DietRegistPage;
