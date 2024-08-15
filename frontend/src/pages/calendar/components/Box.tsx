import { TargetIcon } from '@/assets/icons';
import theme from '@/styles/theme';
import { calendarBoxProps } from '@/types/type';
import { useState } from 'react';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  border: 0.1rem solid #eeeeee;
  border-radius: 0.4rem;
  background-color: ${props => props.theme.white};
  padding: 0.7rem 0.9rem 0.7rem 0.7rem;
`;

const Header = styled.div<{ $type: string }>`
  display: flex;
  ${props =>
    props.$type === 'exercise' ? 'justify-content: space-between' : ''};
  align-items: center;
  gap: 0.8rem;
`;

const Category = styled.div<{ $type: string; $isclicked: boolean }>`
  display: inline-block;
  border-radius: 0.4rem;
  background-color: ${props =>
    props.$type === 'diet'
      ? props.theme.orange
      : props.$type === 'exercise'
        ? props.theme.blue
        : props.theme.darkgreen};
  max-width: 50%;
  height: auto;
  font-size: 1rem;
  color: ${props => props.theme.white};
  text-align: left;
  padding: 0.3rem 0.6rem;
  overflow: hidden;
  text-overflow: ${props => (props.$isclicked ? 'break-word' : 'ellipsis')};
  white-space: ${props => (props.$isclicked ? 'break-normal' : 'nowrap')};
`;

const BigText = styled.span<{ $type: string }>`
  font-size: ${props => (props.$type === 'weight' ? '1.4rem' : '1.15rem')};
`;

const DetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background-color: ${theme['lightgrey']};
  padding: 0.8rem;
  margin-top: 0.6rem;
`;

const DetailInfo = styled.div<{ $type: string }>`
  display: flex;
  ${props =>
    props.$type === 'exercise' ? '' : 'justify-content: space-between'};
  gap: ${props => (props.$type === 'exercise' ? '1.5rem' : 0)};
  align-items: ${props => (props.$type === 'weight' ? 'flex-end' : 'center')};
  font-size: 1rem;
  margin: ${props => (props.$type === 'weight' ? '0.7rem 0.1rem 0.1rem' : 0)};
`;

const Info = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Box = ({ type, selectedInfo }: calendarBoxProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <BoxWrapper>
      <Header $type={type}>
        <Category
          $type={type}
          $isclicked={isClicked}
          onClick={() => setIsClicked(!isClicked)}
        >
          {type === 'diet'
            ? selectedInfo.category === 'BREAKFAST'
              ? '아침'
              : selectedInfo.category === 'LUNCH'
                ? '점심'
                : selectedInfo.category === 'DINNER'
                  ? '저녁'
                  : '간식'
            : type === 'exercise'
              ? selectedInfo.exerciseName
              : selectedInfo.regDate
                  .substring(5, 7)
                  .concat('.')
                  .concat(selectedInfo.regDate.substring(8, 10))}
        </Category>
        <BigText $type={type}>
          {type === 'diet'
            ? selectedInfo.isFast
              ? '단식😷'
              : selectedInfo.totalCalories === 0
                ? '냠냠함🍽️'
                : '총 ' + selectedInfo.totalCalories + 'kcal'
            : type === 'exercise'
              ? '총 ' +
                selectedInfo.exerciseTime +
                '분 ' +
                selectedInfo.caloriesBurned +
                'kcal'
              : ''}
        </BigText>
      </Header>
      {type === 'diet' && selectedInfo?.foodList?.length > 0 && (
        <DetailInfoWrapper>
          {selectedInfo.foodList.map(food => (
            <DetailInfo key={food.foodId} $type={type}>
              <span>
                {food.foodName}{' '}
                <span style={{ color: theme['grey'] }}>
                  ({food.foodIntake}g)
                </span>
              </span>
              <span>{food.calories}kcal</span>
            </DetailInfo>
          ))}
        </DetailInfoWrapper>
      )}
      {type === 'exercise' && selectedInfo?.setList?.length > 0 && (
        <DetailInfoWrapper>
          {selectedInfo.setList.map((set: any, idx: number) => (
            <DetailInfo key={set.exerciseSetId} $type={type}>
              <span>{'세트 ' + (idx + 1)}</span>
              {set.exerciseDistance ? (
                <span>{set.exerciseDistance} km</span>
              ) : set.exerciseWeight ? (
                <span>
                  {set.exerciseWeight} kg X {set.exerciseCount} 회
                </span>
              ) : (
                <span>{set.exerciseCount} 회</span>
              )}
            </DetailInfo>
          ))}
        </DetailInfoWrapper>
      )}
      {type === 'weight' && selectedInfo && (
        <DetailInfo $type={type}>
          <BigText $type={type}>{selectedInfo.weight} kg</BigText>
          <Info style={{ color: theme['grey'] }}>
            <TargetIcon color={'darkgreen'} size={15} /> 목표까지
            <span style={{ color: theme['black'] }}>
              {(selectedInfo.weight - selectedInfo.targetWeight).toFixed(1)}kg
            </span>
            남았어요!
          </Info>
        </DetailInfo>
      )}
    </BoxWrapper>
  );
};

export default Box;
