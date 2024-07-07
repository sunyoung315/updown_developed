import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components';
import { boxProps } from '@/types/type';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  width: 100%;
  height: 6rem;
  background-color: ${props => props.theme.white};
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 0.9rem 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Name = styled.span`
  font-size: 1.6rem;
  padding: 0.2rem;
  color: ${props => props.theme.black};
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const MainInfo = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.black};
`;

const SubInfo = styled.span`
  color: ${props => props.theme.grey};
`;

const Calorie = styled.span`
  font-size: 1.5rem;
  color: ${props => props.theme.black};
`;

const Box = (boxProps: boxProps) => {
  const { type, info } = boxProps;

  const navigator = useNavigate();
  const goFoodDetail = () => {
    if (type === 'diet') {
      navigator(`/diet/detail/${info.foodId}`, { state: { food: info } });
    } else if (type === 'exercise') {
      // navigator(`/exercise/${info.exerciseId}`);
    }
  };

  const deleteInfo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation(); // 이벤트 전파 중단
    if (type === 'diet') {
      console.log('음식 삭제');
    } else if (type === 'exercise') {
      console.log('운동 삭제');
    }
  };

  return (
    <BoxWrapper onClick={goFoodDetail}>
      <Title>
        <Name>{type === 'diet' ? info.foodName : info.exerciseName}</Name>
        <IconButton iconName="close" onClick={deleteInfo} />
      </Title>
      <Infos>
        <MainInfo>
          {type === 'diet' ? info.brandName : info.exerciseTime + '분'} &nbsp;
          <SubInfo>
            {type === 'diet' && info.foodIntake ? info.foodIntake + 'g' : ''}
            {type === 'exercise' &&
            (info.exerciseWeight || info.exerciseCount || info.exerciseDistance)
              ? info.exerciseWeight
                ? info.exerciseWeight + 'kg ' + info.exerciseCount + '회'
                : info.exerciseCount
                  ? info.exerciseCount + '회'
                  : info.exerciseDistance + 'km'
              : ''}
          </SubInfo>
        </MainInfo>
        <Calorie>
          {type === 'diet' ? info.foodCalories : info.exerciseBurned} Kcal
        </Calorie>
      </Infos>
    </BoxWrapper>
  );
};

export default Box;
