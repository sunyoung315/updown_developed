import theme from '@/styles/theme';
import { buttonProps } from '@/types/type';
import styled from 'styled-components';

const ButtonWrapper = styled.button<{
  $color: keyof typeof theme;
  $size?: number;
  $radius?: number;
}>`
  width: ${props => (props?.$size ? `${props?.$size}rem` : '100%')};
  height: 2.25rem;
  border-radius: ${props => props?.$radius || '0.5'}rem;
  background-color: ${props => theme[props.$color]};
  color: ${props => props.theme.white};
  font-size: 1.25rem;
`;

const Button = (props: buttonProps) => {
  const { buttonName, onClick, color, size, radius } = props;

  return (
    <ButtonWrapper
      onClick={onClick}
      $color={color}
      $size={size}
      $radius={radius}
    >
      {buttonName}
    </ButtonWrapper>
  );
};

export default Button;
