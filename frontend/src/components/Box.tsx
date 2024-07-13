import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components';
import { boxProps } from '@/types/type';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  width: 100%;
  height: 6rem;
  background-color: ${props => props.theme.white};
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 0.9rem 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Name = styled.span`
  font-size: 1.6rem;
  padding: 0.2rem;
  color: ${props => props.theme.black};
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

const Box = (boxProps: boxProps) => {
  const { type, info, setIsDeleted, dietId, category } = boxProps;

  const navigator = useNavigate();
  const goFoodDetail = () => {
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

  const totalCount =
    type === 'exercise'
      ? info?.setList?.reduce((acc, set) => acc + (set?.exerciseCount || 0), 0)
      : 0;
  const totalWeight =
    type === 'exercise'
      ? info?.setList?.reduce((acc, set) => acc + (set?.exerciseWeight || 0), 0)
      : 0;
  const totalDistance =
    type === 'exercise'
      ? info?.setList?.reduce(
          (acc, set) => acc + (set?.exerciseDistance || 0),
          0,
        )
      : 0;

  return (
    <BoxWrapper onClick={goFoodDetail}>
      <Title>
        <Name>{type === 'diet' ? info.foodName : info.exerciseName}</Name>
        <IconButton iconName="close" onClick={deleteInfo} />
      </Title>
      <Infos>
        <MainInfo>
          {type === 'diet' ? info.brandName : info.exerciseTime + '분'} &nbsp;
          <SubInfo>
            {type === 'diet' && info.foodIntake ? info.foodIntake + 'g' : ''}
            {type === 'exercise' && (totalWeight || totalCount || totalDistance)
              ? totalWeight
                ? '(' + info?.setList?.length + '세트) 총 ' + totalCount + '회'
                : totalCount
                  ? '총 ' + totalCount + '회'
                  : '총 ' + totalDistance + 'km'
              : ''}
          </SubInfo>
        </MainInfo>
        <Calorie>
          {type === 'diet' ? info.calories : info.caloriesBurned} Kcal
        </Calorie>
      </Infos>
    </BoxWrapper>
  );
};

export default Box;
