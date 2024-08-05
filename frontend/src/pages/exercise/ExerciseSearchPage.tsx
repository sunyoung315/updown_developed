import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './components/Form';
import { BottomSheet, Button, Header, SearchResult } from '@/components';
import { httpStatusCode } from '@/util/http-status';
import useAxios from '@/util/http-commons';
import { exerciseResult, ExerciseSet } from '@/types/type';
import Swal from 'sweetalert2';
import theme from '@/styles/theme';
import styled from 'styled-components';

const ExerciseSearchPageWrapper = styled.div`
  padding-top: 4rem;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2rem 4.75rem 2rem;
`;

const Image = styled.img`
  margin: 4rem 3rem;
  opacity: 0.25;
`;

const ExerciseSearchPage = () => {
  const navigator = useNavigate();

  const regDate = localStorage.getItem('date');

  const [searchStr, setSearchStr] = useState<string>('');
  const [exerciseInfoList, setExerciseInfoList] = useState<exerciseResult[]>(
    [],
  );
  const exerciseRef = useRef<exerciseResult>({});
  const recentWeight = useRef<number>(51);
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [setList, setSetList] = useState<ExerciseSet[]>([]);
  const [detailType, setDetailType] = useState<string>('count');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const goBack = () => {
    navigator('/exercise');
  };

  // 운동 검색 등록 bottom sheet 열기
  const openModal = () => {
    if (exerciseRef && exerciseRef.current) {
      // 1분당 소모 칼로리 계산
      const calories = (
        (((exerciseRef.current.met || 1) *
          (3.5 * recentWeight.current * exerciseTime)) /
          1000) *
        5
      ).toFixed(1);
      setCaloriesBurned(Number(calories));
    }

    setIsOpen(true);
  };

  // 운동 검색 등록 bottom sheet 닫기
  const closeModal = () => {
    // 모달 끄면 작성한 정보 초기화
    setExerciseTime(0);
    setCaloriesBurned(0);
    setSetList([]);

    setIsOpen(false);
  };

  useEffect(() => {
    // 1분당 소모 칼로리 계산
    const calories = (
      (((exerciseRef.current.met || 1) *
        (3.5 * recentWeight.current * exerciseTime)) /
        1000) *
      5
    ).toFixed(1);

    // 1분당 소모 칼로리 설명
    setCaloriesBurned(Number(calories));
  }, [exerciseTime]);

  // 운동 검색
  const searchExercise = async () => {
    if (searchStr.replace(/\s+/g, '') === '')
      return Swal.fire({
        text: '검색어를 입력해주세요!',
        icon: 'warning',
        iconColor: theme['skyblue'],
        confirmButtonColor: theme['blue'],
      });

    try {
      const response = await useAxios.get('/exercise/search', {
        params: { regDate, searchStr },
      });

      if (response.status === httpStatusCode.OK) {
        setExerciseInfoList(response.data.exerciseInfoList);
        recentWeight.current = response.data.recentWeight;
      } else if (response.status === httpStatusCode.NOCONTENT) {
        setExerciseInfoList([]);
        recentWeight.current = 0;
      }
    } catch (err) {
      console.log('운동 검색 에러:', err);
    }
  };

  // 운동 등록
  const registExercise = async () => {
    if (exerciseTime === 0)
      return Swal.fire({
        text: '운동 시간을 입력해주세요!',
        icon: 'warning',
        iconColor: theme['skyblue'],
        confirmButtonColor: theme['blue'],
      });

    try {
      const response = await useAxios.post(`/exercise/${regDate}`, {
        exerciseName: exerciseRef.current.exerciseName,
        exerciseTime,
        caloriesBurned,
        method: true,
        setList: setList,
      });

      if (response.status === httpStatusCode.OK) {
        closeModal();
        navigator('/exercise');
      }
    } catch (err) {
      console.log('운동 등록 에러:', err);
    }
  };

  return (
    <ExerciseSearchPageWrapper>
      <Header
        iconName="back"
        onClick={goBack}
        search={true}
        placeholder="어떤 운동을 하셨나요?"
        onChange={setSearchStr}
        doSearch={searchExercise}
        isFixed={true}
      />
      <ExerciseList>
        {exerciseInfoList.length > 0 ? (
          exerciseInfoList.map((exerciseInfo: exerciseResult) => (
            <SearchResult
              key={exerciseInfo.exerciseInfoId}
              result={exerciseInfo}
              type="exercise"
              exerciseRef={exerciseRef}
              openModal={openModal}
            />
          ))
        ) : (
          <Image src="/images/search.png" alt="img" />
        )}
      </ExerciseList>
      <BottomSheet
        isOpen={isOpen}
        onClose={closeModal}
        title={exerciseRef.current.exerciseName}
      >
        <Form
          setExerciseTime={setExerciseTime}
          exerciseTime={exerciseTime}
          caloriesBurned={caloriesBurned}
          detailType={detailType}
          setDetailType={setDetailType}
          setList={setList}
          setSetList={setSetList}
        />
        <Button buttonName="등록하기" color="blue" onClick={registExercise} />
      </BottomSheet>
    </ExerciseSearchPageWrapper>
  );
};

export default ExerciseSearchPage;
