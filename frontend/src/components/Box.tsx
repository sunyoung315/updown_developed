import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components';
import { boxProps } from '@/types/type';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  width: 100%;
  height: auto;
  background-color: ${props => props.theme.white};
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Name = styled.span<{ $type: string }>`
  font-size: 1.6rem;
  margin-left: ${props => (props.$type === 'exercise' ? '0.3rem' : 0)};
`;

const Record = styled.span`
  font-size: 1.25rem;
  margin-left: 0.7rem;
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

const SetBox = styled.div`
  background-color: ${props => props.theme.lightgrey};
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Box = (boxProps: boxProps) => {
  const { type, info, setIsDeleted, dietId, category } = boxProps;

  const navigator = useNavigate();
  const goDetail = () => {
    if (type === 'diet') {
      navigator(`/diet/detail/${info.foodId}`, { state: { category, dietId } });
    } else if (type === 'exercise') {
      // navigator(`/exercise/${info.exerciseId}`);
    }
  };

  const deleteInfo = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation(); // 이벤트 전파 중단
    if (type === 'diet') {
      try {
        const response = await useAxios.delete('/diet/food', {
          params: { foodId: info.foodId },
        });
        if (response.status === httpStatusCode.OK) {
          console.log('식단 삭제 성공');
          setIsDeleted(true);
        }
      } catch (err) {
        console.log('식단 삭제 에러:', err);
      }
    } else if (type === 'exercise') {
      console.log('운동 삭제');
    }
  };

  return (
    <BoxWrapper onClick={goDetail}>
      <Title>
        <div>
          <Name $type={type}>
            {type === 'diet' ? info.foodName : info.exerciseName}
          </Name>
          {type === 'exercise' && (
            <Record>
              총 {info.exerciseTime}분 / {info.caloriesBurned}kcal
            </Record>
          )}
        </div>
        <IconButton iconName="close" onClick={deleteInfo} size={1.2} />
      </Title>
      {type === 'diet' && (
        <Infos>
          <MainInfo>
            {info.brandName} &nbsp;
            <SubInfo>{info.foodIntake ? info.foodIntake + 'g' : ''}</SubInfo>
          </MainInfo>
          <Calorie>{info.calories} Kcal</Calorie>
        </Infos>
      )}
      {type === 'exercise' && (
        <SetBox>
          {info.setList?.map(set => (
            <SetInfo key={set.exerciseSetId}>
              <div>세트 {set.setNum}</div>
              <div>
                {set.exerciseDistance
                  ? `${set.exerciseDistance} km`
                  : set.exerciseWeight
                    ? `${set.exerciseWeight}kg X ${set.exerciseCount}회`
                    : set.exerciseCount
                      ? `${set.exerciseCount}회`
                      : ''}
              </div>
            </SetInfo>
          ))}
        </SetBox>
      )}
    </BoxWrapper>
  );
};

export default Box;
