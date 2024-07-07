import { Header } from '@/components';
import { SelfForm } from './components';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DietEditWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const DietEditPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const foodId = Number(location.pathname.substring(11));
  const food = location.state.food;

  const goBack = () => {
    navigator(-1);
  };

  return (
    <DietEditWrapper>
      <Header iconName="back" onClick={goBack} headerName="음식 수정" />
      <SelfForm food={food} buttonName="수정완료" foodId={foodId} />
    </DietEditWrapper>
  );
};

export default DietEditPage;
