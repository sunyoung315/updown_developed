import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { SummaryInfo } from '@/types/type';
import DietIcon from '@/assets/icons/restaurant.svg';
import BurnedIcon from '@/assets/icons/burned-icon.svg';
import Running from '@/assets/images/running.png';
import styled from 'styled-components';

const DailyRecordWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: ${props => props.theme.pink};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  font-size: 1.25rem;
`;

const ShareButtonWrapper = styled.button`
  width: 4.5rem;
  padding: 0.4rem;
  background-color: ${props => props.theme.darkpink};
  font-size: 1rem;
  color: ${props => props.theme.white};
  border-radius: 0.5rem;
`;

const NutritionWrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nutrition = styled.span`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.pink};
  font-size: 1rem;
  text-align: center;
  line-height: 1.25rem;
`;

const Gram = styled.span`
  font-size: 1.1rem;
  color: ${props => props.theme.white};
  padding-left: 0.6rem;
  padding-right: 1.8rem;
`;

const Calorie = styled.span`
  font-size: 1.6rem;
  color: ${props => props.theme.white};
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const ProgressBarBox = styled(ProgressBar)`
  position: absolute;
  bottom: 20;
  left: 0;
  width: 100%;
`;

const Image = styled.img`
  width: 9rem;
  position: absolute;
  bottom: -10%;
  left: 26%;
`;

const CalorieInfo = styled.div`
  padding: 4rem 1rem 0rem;
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
  align-items: center;
`;

const DailyRecord = () => {
  const regDate = localStorage.getItem('date');
  const [info, setInfo] = useState<SummaryInfo>({
    dietTotalCalories: 0,
    totalCarbohydrate: 0,
    totalProtein: 0,
    totalFat: 0,
    targetCalories: 1,
    totalCaloriesBurned: 0,
  });

  const getSummaryInfo = async () => {
    try {
      const response = await useAxios<SummaryInfo>('/summary', {
        params: { regDate },
      });

      if (response.status === httpStatusCode.OK) {
        const info = response.data;
        setInfo({
          dietTotalCalories: info.dietTotalCalories,
          totalCarbohydrate: info.totalCarbohydrate,
          totalProtein: info.totalProtein,
          totalFat: info.totalFat,
          targetCalories: info.targetCalories,
          totalCaloriesBurned: info.totalCaloriesBurned,
        });
      }
    } catch (err) {
      console.log('하루 요약 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getSummaryInfo();
  }, [regDate]);

  return (
    <DailyRecordWrapper>
      <TitleWrapper>
        <span>하루 기록</span>
        <ShareButtonWrapper>공유하기</ShareButtonWrapper>
      </TitleWrapper>
      <NutritionWrapper>
        <Nutrition>탄</Nutrition>
        <Gram>{info.totalCarbohydrate} g</Gram>
        <Nutrition>단</Nutrition>
        <Gram>{info.totalProtein} g</Gram>
        <Nutrition>지</Nutrition>
        <Gram style={{ paddingRight: '0' }}>{info.totalFat} g</Gram>
      </NutritionWrapper>
      <div>
        <Calorie>{info.dietTotalCalories}</Calorie>
        <span> / </span>
        <span>{info.targetCalories}</span>
        <span> kcal</span>
      </div>
      <ProgressBarWrapper>
        <ProgressBarBox info={info} />
        <Image src={Running} alt="img" />
      </ProgressBarWrapper>
      <CalorieInfo>
        <img src={BurnedIcon} alt="icon" />
        <span>{info.totalCaloriesBurned} kcal 소모</span>
        <span>|</span>
        <img src={DietIcon} alt="icon" />
        <span>{info.dietTotalCalories} kcal 섭취</span>
      </CalorieInfo>
    </DailyRecordWrapper>
  );
};

export default DailyRecord;
