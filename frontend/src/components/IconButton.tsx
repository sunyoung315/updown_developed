import { IconButtonProps } from '@/types/type';
import BackIcon from '@/assets/icons/back-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import styled from 'styled-components';

const IconButtonWrapper = styled.button`
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButton = (IconButtonProps: IconButtonProps) => {
  const { iconName, onClick } = IconButtonProps;

  return (
    <IconButtonWrapper onClick={onClick}>
      <img src={iconName === 'CloseIcon' ? CloseIcon : BackIcon} alt="icon" />
    </IconButtonWrapper>
  );
};

export default IconButton;
