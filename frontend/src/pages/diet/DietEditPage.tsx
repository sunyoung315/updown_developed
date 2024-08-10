import { Header } from '@/components';
import { SearchForm, SelfForm } from './components';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DietEditWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const DietEditPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const food = location.state.food;
  const category = location.state.category;
  const dietId = location.state.dietId;
  const foodId = Number(location.pathname.substring(11));

  const goBack = () => {
    navigator(`/diet/detail/${foodId}`, { state: { category, dietId } });
  };

  return (
    <DietEditWrapper>
      <Header iconName="back" onClick={goBack} headerName="음식 수정" />
      {food.method ? (
        <SearchForm
          food={food}
          buttonName="수정완료"
          foodId={foodId}
          category={category}
        />
      ) : (
        <SelfForm
          food={food}
          buttonName="수정완료"
          foodId={foodId}
          category={category}
        />
      )}
    </DietEditWrapper>
  );
};

export default DietEditPage;
