import { IconButton } from '@/components';
import { searchResultProps } from '@/types/type';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 0.6rem;
  background-color: ${props => props.theme.lightgrey};
  font-size: 1.13rem;
  padding: 0.7rem 1rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.94rem;
`;
const Info = styled.div`
  font-size: 0.94rem;
  color: ${props => props.theme.grey};
`;

const SearchResult = (searchResultProps: searchResultProps) => {
  const { result, type, category, dietId } = searchResultProps;

  const navigator = useNavigate();
  const regist = () => {
    console.log('검색 등록');
    if (type === 'diet') {
      const foodInfo = {
        foodId: result.foodInfoId,
        foodName: result.foodInfoName,
        calories: result.foodInfoCalories,
        foodIntake: 100,
        ...result,
      };
      navigator(`/diet/regist`, { state: { category, foodInfo, dietId } });
    } else if (type === 'exercise') {
      // navigator(`/exercise/regist/sc/${result.exerciseInfoId}`);
    }
  };

  return (
    <SearchBox>
      <Title>
        <span>
          {type === 'diet' ? result.foodInfoName : result.exerciseName}
        </span>
        <IconButton iconName="add" onClick={regist} />
      </Title>
      <InfoWrapper>
        {type === 'diet' && <div>{result.brandName}</div>}
        {type === 'diet' ? (
          <Info>{result.foodInfoCalories} kcal / 100 g</Info>
        ) : (
          <Info>{result.met} met</Info>
        )}
      </InfoWrapper>
    </SearchBox>
  );
};

export default SearchResult;
