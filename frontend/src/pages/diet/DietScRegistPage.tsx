import { Header } from '@/components';
import { SearchForm } from './components';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const DietRegistWrapper = styled.div`
  padding-bottom: 3.25rem;
`;

const DietScRegistPage = () => {
  const navigator = useNavigate();

  const location = useLocation();
  const category = location.state.category;
  const foodInfo = location.state.foodInfo;

  const goBack = () => {
    navigator(-1);
  };

  return (
    <DietRegistWrapper>
      <Header iconName="back" onClick={goBack} headerName="음식 검색 등록" />
      <SearchForm food={foodInfo} buttonName="등록하기" category={category} />
    </DietRegistWrapper>
  );
};

export default DietScRegistPage;
