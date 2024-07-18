import { Input, Info, IconButton } from '@/components';
import { ExerciseSet, formExProps } from '@/types/type';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;
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

const SetAddButton = styled.button`
  font-size: 1.13rem;
  color: ${props => props.theme.blue};
  width: 100%;
  padding: 0.5rem;
`;

const Form = (formExProps: formExProps) => {
  const {
    exerciseTime,
    setExerciseTime,
    caloriesBurned,
    setCaloriesBurned,
    detailType,
    setDetailType,
    setList,
    setSetList,
  } = formExProps;

  // 상세 정보 타입(횟수, 무게, 거리) 변경
  const changeDetailType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailType(e.target.value);
    setSetList([]);
  };

  // 새로운 상세 정보 추가
  const addNewSet = () => {
    setSetList([
      ...setList,
      {
        exerciseCount: 0,
        exerciseWeight: 0,
        exerciseDistance: 0,
      },
    ]);
  };

  // 상세 정보 변경
  const handleSetList = (
    idx: number,
    key: keyof ExerciseSet,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // 0이 기본값으로 들어가 있을 때 0 자동 삭제
    if (
      e.target.value.length > 1 &&
      Number(e.target.value) >= 1.0 &&
      e.target.value.startsWith('0')
    ) {
      e.target.value = e.target.value.slice(1);
    }

    if (setList && setSetList) {
      const updateSetList = [...setList];
      updateSetList[idx][key] = Number(e.target.value);
      setSetList(updateSetList);
    }
  };

  // 상세 정보 삭제
  const deleteSetList = (idx: number) => {
    if (setList && setSetList) {
      const updateSetList = [...setList];
      updateSetList.splice(idx, 1);
      setSetList(updateSetList);
    }
  };

  return (
    <div>
      <InputWrapper>
        <Input
          inputDir="row"
          inputName="운동 시간"
          isRequired={true}
          unit="분"
          starColor="blue"
          onChange={setExerciseTime}
          value={exerciseTime}
        />
        {setCaloriesBurned ? (
          <Input
            inputDir="row"
            inputName="소모 칼로리"
            isRequired={true}
            unit="kcal"
            starColor="blue"
            onChange={setCaloriesBurned}
            value={caloriesBurned}
          />
        ) : (
          <Info
            infodir="row"
            title="소모 칼로리"
            content={caloriesBurned}
            unit="kcal"
            size={true}
          />
        )}
      </InputWrapper>
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
              onChange={changeDetailType}
            />
          </RadioLabel>
          <RadioLabel htmlFor="weight" $value={detailType} $type="weight">
            무게
            <RadioInput
              type="radio"
              name="unit"
              id="weight"
              value="weight"
              onChange={changeDetailType}
            />
          </RadioLabel>
          <RadioLabel htmlFor="distance" $value={detailType} $type="distance">
            거리
            <RadioInput
              type="radio"
              name="unit"
              id="distance"
              value="distance"
              onChange={changeDetailType}
            />
          </RadioLabel>
        </RadioWrapper>
        <SetList>
          {setList?.map((set: ExerciseSet, idx: number) => (
            <Set key={idx}>
              <div>세트 {idx + 1}</div>
              <Column>
                {detailType === 'weight' ? (
                  <>
                    <NumberInput
                      type="number"
                      value={set.exerciseWeight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSetList(idx, 'exerciseWeight', e)
                      }
                    />{' '}
                    kg
                    <NumberInput
                      type="number"
                      value={set.exerciseCount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSetList(idx, 'exerciseCount', e)
                      }
                    />{' '}
                    회
                  </>
                ) : detailType === 'distance' ? (
                  <>
                    <NumberInput
                      type="number"
                      value={set.exerciseDistance}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSetList(idx, 'exerciseDistance', e)
                      }
                    />{' '}
                    km
                  </>
                ) : (
                  <>
                    <NumberInput
                      type="number"
                      value={set.exerciseCount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSetList(idx, 'exerciseCount', e)
                      }
                    />{' '}
                    회
                  </>
                )}
                <IconButton
                  iconName="close"
                  size={1.2}
                  onClick={() => deleteSetList(idx)}
                />
              </Column>
            </Set>
          ))}
        </SetList>
        <SetAddButton onClick={addNewSet}>+ 세트 추가</SetAddButton>
      </DetailInputWrapper>
    </div>
  );
};

export default Form;
