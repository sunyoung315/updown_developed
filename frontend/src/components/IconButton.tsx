import iconPaths from '@/styles/icon';

import { iconButtonProps } from '@/types/type';
import styled from 'styled-components';

const IconButtonWrapper = styled.button`
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButton = (iconButtonProps: iconButtonProps) => {
  const { iconName, onClick } = iconButtonProps;

  return (
    <IconButtonWrapper onClick={onClick}>
      <img src={iconPaths[iconName]} alt="icon" />
    </IconButtonWrapper>
  );
};

export default IconButton;
