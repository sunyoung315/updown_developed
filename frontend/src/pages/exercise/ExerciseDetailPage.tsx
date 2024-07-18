import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Header, Info } from '@/components';
import { ExerciseSet } from '@/types/type';
import styled from 'styled-components';

const ExerciseDetailPageWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 3.25rem;
`;

const InfoWrapper = styled.div`
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const DetailInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const InputTitle = styled.div`
  font-size: 1.13rem;
  padding-left: 0.1rem;
`;

const RadioWrapper = styled.div`
  width: 8rem;
  height: 1.8rem;
  background-color: ${props => props.theme.blue};
  border-radius: 0.5rem;
  padding: 0 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
`;

const RadioLabel = styled.label<{ $value: string; $type: string }>`
  display: inline-block;
  width: 2.4rem;
  height: 1.3rem;
  background-color: ${props =>
    props.$value === props.$type ? props.theme.white : props.theme.blue};
  border-radius: 0.44rem;
  text-align: center;
  line-height: 1.3rem;
  font-size: 1rem;
  color: ${props =>
    props.$value === props.$type ? props.theme.black : props.theme.white};
`;

const RadioInput = styled.input`
  display: none;
`;

const SetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Set = styled.div`
  width: 100%;
  height: 3rem;
  border-radius: 0.45rem;
  background-color: ${props => props.theme.lightgrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  font-size: 1.13rem;
`;

const Column = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const NumberInput = styled.input`
  width: 3rem;
  height: 1.8rem;
  background-color: ${props => props.theme.blue};
  border-radius: 0.5rem;
  font-size: 1.13rem;
  color: ${props => props.theme.white};
  padding: 0.5rem;
`;

const ExerciseDetailPage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const exercise = location.state.exercise;

  const detailType =
    exercise.setList && exercise.setList[0]?.exerciseWeight
      ? 'weight'
      : exercise.setList && exercise.setList[0]?.exerciseDistance
        ? 'distance'
        : exercise.setList && exercise.setList[0]?.exerciseCount
          ? 'count'
          : '';

  return (
    <ExerciseDetailPageWrapper>
      <Header
        headerName="운동 조회"
        onClick={() => navigator('/exercise')}
        iconName="back"
        isFixed={true}
      />
      <InfoWrapper>
        <Info
          infodir="row"
          title="운동 이름"
          content={exercise.exerciseName}
          isRequired={true}
          starColor="blue"
        />
        <ColumnWrapper>
          <Info
            infodir="row"
            title="운동 시간"
            content={exercise.exerciseTime}
            isRequired={true}
            starColor="blue"
            unit="분"
            unitdir={true}
          />
          <Info
            infodir="row"
            title="소모 칼로리"
            content={exercise.caloriesBurned}
            isRequired={true}
            starColor="blue"
            unit="kcal"
            unitdir={true}
          />
        </ColumnWrapper>
        <DetailInputWrapper>
          <InputTitle>상세 기록</InputTitle>
          <RadioWrapper>
            <RadioLabel htmlFor="count" $value={detailType} $type="count">
              횟수
              <RadioInput
                type="radio"
                name="unit"
                id="count"
                value="count"
                readOnly
              />
            </RadioLabel>
            <RadioLabel htmlFor="weight" $value={detailType} $type="weight">
              무게
              <RadioInput
                type="radio"
                name="unit"
                id="weight"
                value="weight"
                readOnly
              />
            </RadioLabel>
            <RadioLabel htmlFor="distance" $value={detailType} $type="distance">
              거리
              <RadioInput
                type="radio"
                name="unit"
                id="distance"
                value="distance"
                readOnly
              />
            </RadioLabel>
          </RadioWrapper>
          <SetList>
            {exercise.setList?.map((set: ExerciseSet, idx: number) => (
              <Set key={idx}>
                <div>세트 {idx + 1}</div>
                <Column>
                  {detailType === 'weight' ? (
                    <>
                      <NumberInput
                        type="number"
                        value={set.exerciseWeight}
                        readOnly
                      />{' '}
                      kg
                      <NumberInput
                        type="number"
                        value={set.exerciseCount}
                        readOnly
                      />{' '}
                      회
                    </>
                  ) : detailType === 'distance' ? (
                    <>
                      <NumberInput
                        type="number"
                        value={set.exerciseDistance}
                        readOnly
                      />{' '}
                      km
                    </>
                  ) : (
                    <>
                      <NumberInput
                        type="number"
                        value={set.exerciseCount}
                        readOnly
                      />{' '}
                      회
                    </>
                  )}
                </Column>
              </Set>
            ))}
          </SetList>
        </DetailInputWrapper>
        <Button
          buttonName="수정하기"
          color="blue"
          onClick={() =>
            navigator(`/exercise/edit/${exercise.exerciseId}`, {
              state: { exercise },
            })
          }
        />
      </InfoWrapper>
    </ExerciseDetailPageWrapper>
  );
};

export default ExerciseDetailPage;
