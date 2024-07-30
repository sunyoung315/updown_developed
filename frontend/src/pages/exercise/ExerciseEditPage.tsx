import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Header, Input } from '@/components';
import Form from './components/Form';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { ExerciseSet } from '@/types/type';
import styled from 'styled-components';

const ExerciseEditPageWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 3.25rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`;

const ExerciseEditPage = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const exercise = location.state.exercise;

  const [exerciseName, setExerciseName] = useState<string>(
    exercise?.exerciseName,
  );
  const [exerciseTime, setExerciseTime] = useState<number>(
    exercise?.exerciseTime,
  );
  const [caloriesBurned, setCaloriesBurned] = useState<number>(
    exercise?.caloriesBurned,
  );
  const [detailType, setDetailType] = useState<string>(
    exercise.setList && exercise.setList[0]?.exerciseDistance
      ? 'distance'
      : exercise.setList[0]?.exerciseWeight
        ? 'weight'
        : 'count',
  );
  const [setList, setSetList] = useState<ExerciseSet[]>(exercise?.setList);

  // 운동 수정
  const updateExercise = async () => {
    try {
      const response = await useAxios.put(`/exercise/${exercise.exerciseId}`, {
        exerciseName,
        exerciseTime,
        caloriesBurned,
        method: false,
        setList: setList,
      });

      if (response.status === httpStatusCode.OK) {
        navigator(`/exercise/detail/${exercise.exerciseId}`, {
          state: {
            exercise: {
              exerciseId: exercise.exerciseId,
              exerciseName: exerciseName,
              exerciseTime: exerciseTime,
              caloriesBurned: caloriesBurned,
              method: false,
              setList: setList,
            },
          },
        });
      }
    } catch (err) {
      console.log('운동 수정 에러:', err);
    }
  };

  return (
    <ExerciseEditPageWrapper>
      <Header
        headerName="운동 수정"
        onClick={() =>
          navigator(`/exercise/detail/${exercise.exerciseId}`, {
            state: { exercise },
          })
        }
        iconName="back"
        isFixed={true}
      />
      <InputBox>
        <Input
          inputDir="row"
          inputType="text"
          inputName="운동 이름"
          placeholder="운동 이름 (최대 20자)"
          isRequired={true}
          starColor="blue"
          onChange={setExerciseName}
          value={exerciseName}
        />
        <Form
          exerciseTime={exerciseTime}
          setExerciseTime={setExerciseTime}
          caloriesBurned={caloriesBurned}
          setCaloriesBurned={setCaloriesBurned}
          detailType={detailType}
          setDetailType={setDetailType}
          setList={setList}
          setSetList={setSetList}
        />
        <Button buttonName="수정완료" onClick={updateExercise} color="blue" />
      </InputBox>
    </ExerciseEditPageWrapper>
  );
};

export default ExerciseEditPage;
