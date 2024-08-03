import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet, Button, IconButton } from '@/components';
import Form from '@/pages/exercise/components/Form';
import { boxProps, ExerciseSet } from '@/types/type';
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
  gap: 0.6rem;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;

const Name = styled.span<{ $type?: string }>`
  font-size: 1.3em;
  margin-left: ${props => (props.$type === 'exercise' ? '0.2rem' : 0)};
`;

const Record = styled.div`
  font-size: 1.1rem;
  margin-left: 0.2rem;
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const MainInfo = styled.span`
  font-size: 1.1rem;
  color: ${props => props.theme.black};
`;

const SubInfo = styled.span`
  color: ${props => props.theme.grey};
`;

const Calorie = styled.span`
  font-size: 1.4rem;
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
  const { type, info, setRefreshed, dietId, category, recentWeight } = boxProps;

  const navigator = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [exerciseTime, setExerciseTime] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [setList, setSetList] = useState<ExerciseSet[]>([]);
  const [detailType, setDetailType] = useState<string>('count');

  const openModal = () => {
    if (type === 'exercise') {
      setExerciseTime(info.exerciseTime || 0);
      setCaloriesBurned(info.caloriesBurned || 0);
      setSetList(info.setList || []);

      if (info.setList && info.setList[0]?.exerciseDistance) {
        setDetailType('distance');
      } else if (info.setList && info.setList[0]?.exerciseWeight) {
        setDetailType('weight');
      } else {
        setDetailType('count');
      }
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (recentWeight && type === 'exercise') {
      // 1분당 소모 칼로리 계산
      const calories = (
        (((info.met || 1) * (3.5 * recentWeight * exerciseTime)) / 1000) *
        5
      ).toFixed(1);

      // 1분당 소모 칼로리 설명
      setCaloriesBurned(Number(calories));
    }
  }, [exerciseTime]);

  const goDetail = () => {
    if (type === 'diet') {
      navigator(`/diet/detail/${info.foodId}`, { state: { category, dietId } });
    } else if (type === 'exercise') {
      // 1. 직접 등록
      if (!info.method)
        navigator(`/exercise/detail/${info.exerciseId}`, {
          state: { exercise: info },
        });
      // 2. 검색 등록
      else {
        openModal();
      }
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
          setRefreshed(true);
        }
      } catch (err) {
        console.log('식단 삭제 에러:', err);
      }
    } else if (type === 'exercise') {
      try {
        const response = await useAxios.delete(`/exercise/${info.exerciseId}`);

        if (response.status === httpStatusCode.OK) {
          setRefreshed(true);
        }
      } catch (err) {
        console.log('운동 삭제 에러:', err);
      }
    }
  };

  // 운동 수정
  const updateExercise = async () => {
    if (type === 'exercise') {
      try {
        const response = await useAxios.put(`/exercise/${info.exerciseId}`, {
          exerciseName: info.exerciseName,
          exerciseTime: exerciseTime,
          caloriesBurned: caloriesBurned,
          method: true,
          setList: setList,
        });

        if (response.status === httpStatusCode.OK) {
          closeModal();
          setRefreshed(true);
        }
      } catch (err) {
        console.log('운동 수정 오류:', err);
      }
    }
  };

  return (
    <>
      <BoxWrapper onClick={goDetail}>
        <Title>
          <TitleDiv>
            <Name $type={type}>
              {type === 'diet' ? info.foodName : info.exerciseName}
            </Name>
            {type === 'exercise' && (
              <Record>
                총 {info.exerciseTime}분 / {info.caloriesBurned}kcal
              </Record>
            )}
          </TitleDiv>
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
        {type === 'exercise' && info.setList && info.setList.length > 0 && (
          <SetBox>
            {info.setList?.map((set, idx) => (
              <SetInfo key={set.exerciseSetId}>
                <div>세트 {idx + 1}</div>
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
      {type === 'exercise' && (
        <BottomSheet
          isOpen={isOpen}
          onClose={closeModal}
          title={info.exerciseName}
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
          <Button buttonName="수정하기" color="blue" onClick={updateExercise} />
        </BottomSheet>
      )}
    </>
  );
};

export default Box;
