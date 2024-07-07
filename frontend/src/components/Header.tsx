import { headerProps } from '@/types/type';
import SearchInput from './SearchInput';
import IconButton from './IconButton';
import styled from 'styled-components';

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

  const openModal = () => {
    console.log('영양 성분 상세');
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
        <NutritionButton onClick={openModal}>영양 성분 상세</NutritionButton>
      )}
    </HeaderWrapper>
  );
};

export default Header;
