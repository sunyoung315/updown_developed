import { dietProps } from '@/types/type';
import styled from 'styled-components';

const OneDietWrapper = styled.div`
  aspect-ratio: auto 1 / 1;
  background-color: ${props => props.theme.orange};
`;

const OneDiet = ({ diet }: { diet: dietProps }) => {
  const { dietId, category, dietImg, totalCalories, isFast } = diet;

  return (
    <OneDietWrapper>
      <div>{dietId}</div>
      <div>{category}</div>
      <div>{dietImg}</div>
      <div>{totalCalories}</div>
      <div>{isFast}</div>
    </OneDietWrapper>
  );
};

export default OneDiet;
