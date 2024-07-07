import { Header } from '@/components';
import { SearchForm } from './components';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DietRegistWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const DietScEditPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const foodId = Number(location.pathname.substring(14));
  const food = location.state.food;

  const goBack = () => {
    navigator(-1);
  };

  return (
    <DietRegistWrapper>
      <Header iconName="back" onClick={goBack} headerName="음식 수정" />
      <SearchForm food={food} buttonName="수정완료" foodId={foodId} />
    </DietRegistWrapper>
  );
};

export default DietScEditPage;
