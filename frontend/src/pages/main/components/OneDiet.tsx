import { useNavigate } from 'react-router-dom';
import { dietProps } from '@/types/type';
import CheckIcon from '@/assets/icons/check-icon.svg';
import PlusIcon from '@/assets/icons/plus-icon.svg';
import YlCheckIcon from '@/assets/icons/yl-check-icon.svg';
import WhCheckIcon from '@/assets/icons/wh-check-icon.svg';
import styled from 'styled-components';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';

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
  const { category, regDate, fast, setFast } = dietProps;

  const navigator = useNavigate();

  const goDietDetails = () => {
    navigator(`/diet/${category}`, { state: { dietId: diet?.dietId } });
  };

  const registFasting = async () => {
    try {
      const response = await useAxios.post('/diet/isFast', {
        regDate,
        category,
      });
      if (response.status === httpStatusCode.OK) {
        console.log('단식 등록 성공');
        setFast(!fast);
      }
    } catch (err) {
      console.log('단식 등록 에러', err);
    }
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
        {/* 1. 식단을 등록하지 않은 경우 */}
        {!diet ? (
          <button onClick={goDietDetails}>
            <img src={PlusIcon} alt="plus" />
          </button>
        ) : // 2. 식단을 등록하지 않았고, 단식버튼을 누른 경우
        //    또는 식단을 등록했지만 단식인 경우
        fast ? (
          <img src={CheckIcon} alt="check" />
        ) : (
          // 3. 식단을 등록했고, 단식이 아닌 경우
          <button onClick={goDietDetails}>
            <img src={CheckIcon} alt="check" />
          </button>
        )}
      </CategoryWrapper>
      {/* 1. 식단을 등록하지 않은 경우 (단식 버튼 클릭 여부에 따라 변경) */}
      {!diet ? (
        <DietImg
          src={fast ? `/images/fasting.png` : `/images/${category}.png`}
        />
      ) : // 2. 단식을 한 경우
      fast ? (
        <DietImg
          src={fast ? `/images/fasting.png` : `/images/${category}.png`}
        />
      ) : (
        // 3. 식단 이미지 유무
        <>
          <DietImg src={diet?.dietImg || `/images/${category}.png`} />
        </>
      )}
      {/* 1. 식단을 등록했고, 단식이 아닌 경우 경우 */}
      {diet && !fast ? (
        <Calories>{diet?.totalCalories} kcal</Calories>
      ) : (
        // 2. 단식이거나 식단을 등록하지 않은 경우
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
