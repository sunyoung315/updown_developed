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
  // method => false: 직접 등록 / true: 검색 등록
  const foodId = food.method
    ? Number(location.pathname.substring(14))
    : Number(location.pathname.substring(11));

  const goBack = () => {
    navigator(-1);
  };

  return (
    <DietEditWrapper>
      <Header iconName="back" onClick={goBack} headerName="음식 수정" />
      {food.method ? (
        <SearchForm food={food} buttonName="수정완료" foodId={foodId} />
      ) : (
        <SelfForm food={food} buttonName="수정완료" foodId={foodId} />
      )}
    </DietEditWrapper>
  );
};

export default DietEditPage;
