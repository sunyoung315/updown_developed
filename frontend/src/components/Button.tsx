import theme from '@/styles/theme';
import { buttonProps } from '@/types/type';
import { RightArrow } from '@/assets/icons';
import styled from 'styled-components';

const ButtonWrapper = styled.button<{
  $color: keyof typeof theme;
  $size?: number;
  $radius?: number;
  $dir?: 'top' | 'bottom';
  $textcolor?: keyof typeof theme;
}>`
  width: ${props => (props?.$size ? `${props?.$size}rem` : '100%')};
  height: ${props => (props?.$color === 'transparent' ? '2rem' : '2.2rem')};
  background-color: ${props => theme[props.$color]};
  color: ${props =>
    props?.$textcolor ? theme[props.$textcolor] : props.theme.white};
  font-size: ${props =>
    props?.$color === 'transparent' ? '1.13rem' : '1.2rem'};
  border-radius: ${props =>
    props?.$dir === 'top'
      ? '0.5rem 0.5rem 0 0'
      : props?.$dir === 'bottom'
        ? '0 0 0.5rem 0.5rem'
        : `${props?.$radius || '0.6'}rem`};
`;

const Button = (props: buttonProps) => {
  const { buttonName, onClick, color, size, radius, dir, textColor } = props;

  return (
    <ButtonWrapper
      onClick={onClick}
      $color={color}
      $size={size}
      $radius={radius}
      $dir={dir}
      $textcolor={textColor}
    >
      {buttonName}
      {color === 'transparent' && <RightArrow size={18} isButton={false} />}
    </ButtonWrapper>
  );
};

export default Button;
