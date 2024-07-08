import { useState } from 'react';
import { headerProps } from '@/types/type';
import { SearchInput, IconButton, Info } from '@/components';
import styled from 'styled-components';
import BottomSheet from './BottomSheet';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 1.7rem;
  gap: 0.5rem;
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

const ModalTitle = styled.div`
  font-size: 1.63rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
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
    searchFood,
  } = headerProps;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const food = {
    foodId: 11,
    foodName: '마라탕',
    brandName: '춘리마라탕',
    foodIntake: 700,
    calories: 1000,
    carbohydrate: 10,
    sugars: 2,
    dietaryFiber: 1,
    protein: 1.4,
    fat: 20,
    saturatedFat: 15,
    transFat: 2,
    cholesterol: 15,
    sodium: 2000,
    potassium: 400,
    method: true,
  };

  return (
    <HeaderWrapper>
      <IconButton iconName={iconName} onClick={onClick} />
      {headerName && (
        <>
          <HeaderName>{headerName}</HeaderName>
          <Blank $search={search} />
        </>
      )}
      {search && (
        <>
          <SearchInput
            onChange={onChange}
            placeholder={placeholder}
            search={searchFood}
          />
          <Blank $search={search} />
        </>
      )}
      {nutritionButton && (
        <>
          <NutritionButton onClick={openModal}>영양 성분 상세</NutritionButton>
          <BottomSheet isOpen={isModalOpen} onClose={closeModal}>
            <ModalTitle>
              <div>아침 영양 성분 상세</div>
              <IconButton iconName="close" onClick={closeModal} size={1.6} />
            </ModalTitle>
            <Total>
              <span
                style={{ fontSize: '1.25rem' }}
              >{`총 섭취량 ${food.foodIntake}g`}</span>
              <span
                style={{ fontSize: '1.8rem' }}
              >{`${food.calories} kcal`}</span>
            </Total>
            <Hr />
            <Info
              title="탄수화물"
              content={food.carbohydrate}
              unit="g"
              ntr={true}
            />
            <Info
              title="당"
              content={food.sugars}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Info
              title="식이섬유"
              content={food.dietaryFiber}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Hr />
            <Info title="단백질" content={food.protein} unit="g" ntr={true} />
            <Hr />
            <Info title="지방" content={food.fat} unit="g" ntr={true} />
            <Info
              title="포화지방"
              content={food.transFat}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Info
              title="트랜스지방"
              content={food.saturatedFat}
              titleColor="grey"
              unit="g"
              ntr={true}
            />
            <Hr />
            <Info
              title="콜레스테롤"
              content={food.cholesterol}
              unit="mg"
              ntr={true}
            />
            <Hr />
            <Info title="나트륨" content={food.sodium} unit="mg" ntr={true} />
            <Hr />
            <Info title="칼륨" content={food.potassium} unit="mg" ntr={true} />
          </BottomSheet>
        </>
      )}
    </HeaderWrapper>
  );
};

export default Header;
