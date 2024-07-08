import { IconButton } from '@/components';
import { searchResultProps } from '@/types/type';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBox = styled.div`
  width: 100%;
  height: 4.5rem;
  border-radius: 0.6rem;
  background-color: ${props => props.theme.lightgrey};
  font-size: 1.13rem;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  font-size: 0.94rem;
  color: ${props => props.theme.grey};
`;

const SearchResult = (searchResultProps: searchResultProps) => {
  const { result, type, category } = searchResultProps;

  const navigator = useNavigate();
  const regist = () => {
    console.log('검색 등록');
    if (type === 'diet') {
      const foodInfo = {
        foodId: result.foodInfoId,
        foodName: result.foodInfoName,
        foodCalories: result.foodInfoCalories,
        foodIntake: 100,
        ...result,
      };
      navigator(`/diet/regist`, { state: { category, foodInfo } });
    } else if (type === 'exercise') {
      // navigator(`/exercise/regist/sc/${result.exerciseInfoId}`);
    }
  };

  return (
    <SearchBox>
      <Title>
        <span>
          {type === 'diet'
            ? result.foodInfoName + ' (' + result.brandName + ')'
            : result.exerciseName}
        </span>
        <IconButton iconName="add" onClick={regist} />
      </Title>
      <Info>
        {type === 'diet'
          ? result.foodInfoCalories + 'kcal / 100g'
          : result.met + ' met'}
      </Info>
    </SearchBox>
  );
};

export default SearchResult;
