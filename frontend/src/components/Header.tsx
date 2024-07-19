import { useState } from 'react';
import { headerProps } from '@/types/type';
import { SearchInput, IconButton, Info } from '@/components';
import styled from 'styled-components';
import BottomSheet from './BottomSheet';

const HeaderWrapper = styled.div<{ $isfixed?: boolean }>`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.3rem;
  gap: 1.2rem;
  ${props =>
    props?.$isfixed
      ? `position: fixed;
    top: 0;
    width: 100%;
    background-color: ${props.theme.white};
    z-index: 10;`
      : ''}
`;

const NutritionButton = styled.button`
  width: 6rem;
  padding: 0.4rem;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.orange};
  font-size: 1rem;
  text-align: center;
  border-radius: 0.5rem;
`;

const HeaderName = styled.div`
  font-size: 1.25rem;
  line-height: 1.7rem;
`;

const Blank = styled.div<{ $search: boolean | undefined }>`
  display: inline-block;
  width: ${props => (props.$search ? '1rem' : '1.7rem')};
  height: 1.7rem;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
`;
const Hr = styled.div`
  background-color: ${props => props.theme.grey};
  height: 0.1rem;
  border: none;
  margin: 0.8rem 0;
`;

const Header = (headerProps: headerProps) => {
  const {
    iconName,
    onClick,
    headerName,
    nutritionButton,
    search,
    placeholder,
    onChange,
    doSearch,
    nutrition,
    mypage,
    logout,
    isFixed,
  } = headerProps;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <HeaderWrapper $isfixed={isFixed}>
      <IconButton iconName={iconName} onClick={onClick} />
      {headerName && (
        <>
          <HeaderName>{headerName}</HeaderName>
          {mypage ? (
            <IconButton iconName="logout" onClick={logout} />
          ) : (
            <Blank $search={search} />
          )}
        </>
      )}
      {search && (
        <>
          <SearchInput
            onChange={onChange}
            placeholder={placeholder}
            search={doSearch}
          />
          <Blank $search={search} />
        </>
      )}
      {nutritionButton && (
        <>
          <NutritionButton onClick={openModal}>영양 성분 상세</NutritionButton>
          <BottomSheet
            isOpen={isModalOpen}
            onClose={closeModal}
            title="아침 영양 성분 상세"
          >
            <Total>
              <span
                style={{ fontSize: '1.25rem' }}
              >{`총 섭취량 ${nutrition?.totalFoodIntake || 0}g`}</span>
              <span
                style={{ fontSize: '1.8rem' }}
              >{`${nutrition?.totalCalories || 0} kcal`}</span>
            </Total>
            <Hr />
            <Info
              title="탄수화물"
              content={nutrition?.totalCarbohydrate || 0}
              unit="g"
              ntr={true}
            />
            <Info
              title="당"
              content={nutrition?.totalSugars || 0}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Info
              title="식이섬유"
              content={nutrition?.totalDietaryFiber || 0}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Hr />
            <Info
              title="단백질"
              content={nutrition?.totalProtein || 0}
              unit="g"
              ntr={true}
            />
            <Hr />
            <Info
              title="지방"
              content={nutrition?.totalFat || 0}
              unit="g"
              ntr={true}
            />
            <Info
              title="포화지방"
              content={nutrition?.totalSaturatedFat || 0}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Info
              title="트랜스지방"
              content={nutrition?.totalTransFat || 0}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Hr />
            <Info
              title="콜레스테롤"
              content={nutrition?.totalCholesterol || 0}
              unit="mg"
              ntr={true}
            />
            <Hr />
            <Info
              title="나트륨"
              content={nutrition?.totalSodium || 0}
              unit="mg"
              ntr={true}
            />
            <Hr />
            <Info
              title="칼륨"
              content={nutrition?.totalPotassium || 0}
              unit="mg"
              ntr={true}
            />
          </BottomSheet>
        </>
      )}
    </HeaderWrapper>
  );
};

export default Header;
