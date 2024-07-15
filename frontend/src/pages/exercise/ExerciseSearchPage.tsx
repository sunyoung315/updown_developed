import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet, Button, Header, SearchResult } from '@/components';
import { httpStatusCode } from '@/util/http-status';
import useAxios from '@/util/http-commons';
import { exerciseResult, ExerciseSet } from '@/types/type';
import styled from 'styled-components';
import Form from './components/Form';

const ExerciseSearchPageWrapper = styled.div`
  padding-top: 4rem;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2rem 4.75rem 2rem;
`;

const ExerciseSearchPage = () => {
  const navigator = useNavigate();

  const regDate = localStorage.getItem('date');

  const [searchStr, setSearchStr] = useState<string>('');
  // const [exerciseInfoList, setExerciseInfoList] = useState<exerciseResult[]>(
  //   [],
  // );
  const exerciseRef = useRef<exerciseResult>({});
  const recentWeight = useRef<number>(51);
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  // 운동 상세 정보 수정에서 필요!
  // const [setList, setSetList] = useState<ExerciseSet[]>([]);
  const [newSetList, setNewSetList] = useState<ExerciseSet[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detailType, setDetailType] = useState<string>('count');

  const changeDetailType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailType(e.target.value);
    setNewSetList([]);
  };

  const addNewSet = () => {
    setNewSetList([
      ...newSetList,
      {
        exerciseCount: 0,
        exerciseWeight: 0,
        exerciseDistance: 0,
      },
    ]);
  };

  const exerciseInfoList = [
    {
      exerciseInfoId: 1,
      exerciseName: '달리기',
      met: 12,
    },
    {
      exerciseInfoId: 2,
      exerciseName: '자전거 타기',
      met: 7,
    },
  ];

  const goBack = () => {
    navigator('/main');
  };

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

  useEffect(() => {
    // 1분당 소모 칼로리 계산
    const calories = (
      (((exerciseRef.current.met || 1) *
        (3.5 * recentWeight.current * exerciseTime)) /
        1000) *
      5
    ).toFixed(1);

    setCaloriesBurned(Number(calories));

    // 운동 상세 정보 수정에서 필요!
    // if (setList && setList[0]?.exerciseDistance) {
    //   setDetailType('distance');
    // } else if (setList && setList[0]?.exerciseWeight) {
    //   setDetailType('weight');
    // } else {
    //   setDetailType('count');
    // }
  }, [exerciseTime]);

  const closeModal = () => {
    setIsOpen(false);

    // 모달 끄면 작성한 정보 초기화
    setExerciseTime(0);
    setCaloriesBurned(0);
    setNewSetList([]);
  };

  // 운동 검색
  const searchExercise = async () => {
    console.log('운동 검색');
    console.log('searchStr:', searchStr);
    //   try {
    //     const response = await useAxios.get('/exercise/search', {
    //       params: { searchStr },
    //     });

    //     if (response.status === httpStatusCode.OK) {
    //       setExerciseInfoList(response.data.exerciseInfoList);
    //       recentWeight.current = response.data.recentWeight;
    //     } else if (response.status === httpStatusCode.NOCONTENT) {
    //       setExerciseInfoList([]);
    //       recentWeight.current = 0;
    //     }
    //   } catch (err) {
    //     console.log('운동 검색 에러:', err);
    //   }
  };

  // 운동 등록
  const registExercise = async () => {
    console.log('운동 등록');
    console.log('exerciseName:', exerciseRef.current.exerciseName);
    console.log('exerciseTime', exerciseTime);
    console.log('caloriesBurned:', caloriesBurned);
    console.log('method:', true);
    console.log('setList:', newSetList);

    // try {
    //   const response = await useAxios.post(`/exercise/${regDate}`, {
    //     exerciseName: exerciseRef.current.exerciseName,
    //     exerciseTime,
    //     caloriesBurned,
    //     method: true,
    //     setList: newSetList,
    //   });

    //   if(response.status === httpStatusCode.OK) {
    //     console.log('운동 등록 성공');
    //     closeModal();
    //   }
    // } catch (err) {
    //   console.log('운동 등록 에러:', err);
    // }
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
        {exerciseInfoList.map((exerciseInfo: exerciseResult) => (
          <SearchResult
            key={exerciseInfo.exerciseInfoId}
            result={exerciseInfo}
            type="exercise"
            exerciseRef={exerciseRef}
            openModal={openModal}
          />
        ))}
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
          changeDetailType={changeDetailType}
          addNewSet={addNewSet}
          newSetList={newSetList}
          setNewSetList={setNewSetList}
        />
        <Button buttonName="등록하기" color="blue" onClick={registExercise} />
      </BottomSheet>
    </ExerciseSearchPageWrapper>
  );
};

export default ExerciseSearchPage;
