import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dietProps } from '@/types/type';
import CheckIcon from '@/assets/icons/check-icon.svg';
import PlusIcon from '@/assets/icons/plus-icon.svg';
import YlCheckIcon from '@/assets/icons/yl-check-icon.svg';
import WhCheckIcon from '@/assets/icons/wh-check-icon.svg';
import FoodImage from '@/assets/images/마라탕.png';
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
  color: ${props => (props?.$isfast ? props.theme.white : props.theme.yellow)};
`;

const Calories = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.white};
`;

const OneDiet = (dietProps: dietProps) => {
  const { diet } = dietProps || {};
  const { title, regDate } = dietProps;

  const [fast, setFast] = useState(diet?.isFast);

  const navigator = useNavigate();

  const goDietDetails = () => {
    navigator(`/diet/${title}`, { state: { dietId: diet?.dietId } });
  };

  const registFasting = () => {
    setFast(!fast);
    // 단식 등록 axios
  };

  useEffect(() => {
    setFast(diet?.isFast);
  }, [regDate]);

  return (
    <OneDietWrapper>
      <CategoryWrapper>
        <Category>
          {title == 'breakfast'
            ? '아침'
            : title == 'lunch'
              ? '점심'
              : title == 'dinner'
                ? '저녁'
                : '간식'}
        </Category>
        <button onClick={goDietDetails}>
          {(diet && !fast) || fast ? (
            <img src={CheckIcon} alt="check" />
          ) : (
            <img src={PlusIcon} alt="plus" />
          )}
        </button>
      </CategoryWrapper>
      {diet && !diet.isFast && diet.dietImg ? (
        <DietImg src={diet?.dietImg} />
      ) : (
        <DietImg src={fast ? `/images/fasting.png` : `/images/${title}.png`} />
      )}
      {diet && !diet?.isFast ? (
        <Calories>{diet?.totalCalories} kcal</Calories>
      ) : (
        <FastWrapper onClick={registFasting}>
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
