import iconPaths from '@/styles/icon';
import { iconButtonProps } from '@/types/type';
import styled from 'styled-components';

const IconButtonWrapper = styled.button<{ $size?: number }>`
  width: ${props => props?.$size}rem;
  height: ${props => props?.$size}rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img<{ $size?: number }>`
  width: ${props => props?.$size}rem;
  height: ${props => props?.$size}rem;
`;

const IconButton = (iconButtonProps: iconButtonProps) => {
  const { iconName, onClick, size } = iconButtonProps;
  console.log;

  return (
    <IconButtonWrapper onClick={onClick} $size={size}>
      <Image src={iconPaths[iconName]} alt="icon" $size={size} />
    </IconButtonWrapper>
  );
};

export default IconButton;
