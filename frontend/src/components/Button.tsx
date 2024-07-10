import theme from '@/styles/theme';
import { buttonProps } from '@/types/type';
import styled from 'styled-components';

const ButtonWrapper = styled.button<{
  $color: keyof typeof theme;
  $size?: number;
  $radius?: number;
  $dir?: 'top' | 'bottom';
}>`
  width: ${props => (props?.$size ? `${props?.$size}rem` : '100%')};
  height: 2.3rem;
  background-color: ${props => theme[props.$color]};
  color: ${props => props.theme.white};
  font-size: 1.25rem;
  border-radius: ${props =>
    props?.$dir === 'top'
      ? '0.5rem 0.5rem 0 0'
      : props?.$dir === 'bottom'
        ? '0 0 0.5rem 0.5rem'
        : `${props?.$radius || '0.5'}rem`};
`;

const Button = (props: buttonProps) => {
  const { buttonName, onClick, color, size, radius, dir } = props;

  return (
    <ButtonWrapper
      onClick={onClick}
      $color={color}
      $size={size}
      $radius={radius}
      $dir={dir}
    >
      {buttonName}
    </ButtonWrapper>
  );
};

export default Button;
