import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Input } from '@/components';
import Form from './components/Form';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { ExerciseSet } from '@/types/type';
import styled from 'styled-components';

const ExerciseRegistPageWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 3.25rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`;

const ExerciseRegistPage = () => {
  const navigator = useNavigate();

  const [exerciseName, setExerciseName] = useState<string>('');
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [detailType, setDetailType] = useState<string>('count');
  const [setList, setSetList] = useState<ExerciseSet[]>([]);

  const regDate = localStorage.getItem('date');

  // 운동 등록
  const registExercise = async () => {
    try {
      const response = await useAxios.post(`/exercise/${regDate}`, {
        exerciseName,
        exerciseTime,
        caloriesBurned,
        method: false,
        setList: setList,
      });

      if (response.status === httpStatusCode.OK) {
        console.log('운동 등록 성공');
        navigator('/exercise');
      }
    } catch (err) {
      console.log('운동 등록 에러:', err);
    }
  };

  return (
    <ExerciseRegistPageWrapper>
      <Header
        headerName="운동 등록"
        onClick={() => navigator('/exercise')}
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
        <Button buttonName="등록하기" onClick={registExercise} color="blue" />
      </InputBox>
    </ExerciseRegistPageWrapper>
  );
};

export default ExerciseRegistPage;
