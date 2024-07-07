import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dietProps } from '@/types/type';
import CheckIcon from '@/assets/icons/check-icon.svg';
import PlusIcon from '@/assets/icons/plus-icon.svg';
import YlCheckIcon from '@/assets/icons/yl-check-icon.svg';
import WhCheckIcon from '@/assets/icons/wh-check-icon.svg';
import styled from 'styled-components';

const OneDietWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.orange};
  padding: 0.8rem;
  text-align: center;
`;
const CategoryWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Category = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.white};
`;

const DietImg = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  margin: 0.8rem;
`;

const FastWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Fast = styled.span<{ $isfast?: boolean }>`
  font-size: 1.1rem;
  color: ${props => (props.$isfast ? props.theme.white : props.theme.yellow)};
`;

const OneDiet = ({ diet }: { diet: dietProps }) => {
  const { dietId, category, dietImg, totalCalories, isFast } = diet;

  const [fast, setFast] = useState(isFast);

  const navigator = useNavigate();

  const goRegistDiet = () => {
    navigator(`/diet/regist/${category}`);
  };

  const goDietDetails = () => {
    navigator(`/diet/${category}`, { state: { dietId: dietId } });
  };

  return (
    <OneDietWrapper>
      <CategoryWrapper>
        <Category>
          {category == 'breakfast'
            ? '아침'
            : category == 'lunch'
              ? '점심'
              : category == 'dinner'
                ? '저녁'
                : '간식'}
        </Category>
        {dietId === 0 ? (
          <button onClick={goDietDetails}>
            <img src={PlusIcon} alt="plus" />
          </button>
        ) : (
          <button onClick={goDietDetails}>
            <img src={CheckIcon} alt="check" />
          </button>
        )}
      </CategoryWrapper>
      {dietId !== 0 ? (
        <DietImg src={dietImg} />
      ) : (
        <DietImg
          src={fast ? `/images/fasting.png` : `/images/${dietImg}.png`}
        />
      )}
      {dietId !== 0 ? (
        <div>{totalCalories}</div>
      ) : (
        <FastWrapper onClick={() => setFast(!fast)}>
          <span>
            <img
              style={{ display: 'inline' }}
              src={fast ? WhCheckIcon : YlCheckIcon}
              alt="fast-check"
            />
          </span>
          <Fast $isfast={fast}>단식했어요</Fast>
        </FastWrapper>
      )}
    </OneDietWrapper>
  );
};

export default OneDiet;
