import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpStatusCode } from '@/util/http-status';
import useAxios from '@/util/http-commons';
import { Button } from '@/components';
import { ExerciseInfo } from '@/types/type';
import Running from '@/assets/images/running.png';
import Burned from '@/assets/icons/burned-icon.svg';
import styled from 'styled-components';

const DailyExerciseWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: ${props => props.theme.skyblue};
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  font-size: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
  gap: 1rem;
`;

const Image = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 0.7rem;
`;

const ExerciseTime = styled.div`
  font-size: 2.1rem;
  color: ${props => props.theme.white};
`;

const Unit = styled.span`
  font-size: 1.56rem;
  color: ${props => props.theme.white};
`;

const BurnedCalories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  height: 2rem;
`;

const Icon = styled.img`
  display: block;
  height: 1rem;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
`;

const DailyExercise = ({ regDate }: { regDate: string }) => {
  const navigator = useNavigate();

  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInfo>();

  // 운동 정보 조회
  const getExerciseInfo = async () => {
    try {
      const response = await useAxios.get(`/exercise/${regDate}`);

      if (response.status === httpStatusCode.OK) {
        setExerciseInfo(response?.data);
      } else if (response.status === httpStatusCode.NOCONTENT) {
        setExerciseInfo(undefined);
      }
    } catch (err) {
      console.log('운동 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getExerciseInfo();
  }, [regDate]);

  const goExercisePage = () => {
    navigator('/exercise');
  };

  return (
    <DailyExerciseWrapper>
      <Title>운동</Title>
      <Content>
        <div>오늘의 운동 시간은?</div>
        <ExerciseTime>
          {exerciseInfo?.totalTime || 0}
          <Unit> 분</Unit>
        </ExerciseTime>
        <Image src={exerciseInfo?.exerciseImg || Running} alt="img" />
        <BurnedCalories>
          <Icon src={Burned} alt="icon" />
          <Text>소모량 {exerciseInfo?.totalCaloriesBurned || 0} kcal</Text>
        </BurnedCalories>
        <Button
          buttonName="기록하기"
          onClick={goExercisePage}
          color="blue"
          size={10.25}
          radius={1}
        />
      </Content>
    </DailyExerciseWrapper>
  );
};

export default DailyExercise;
