import { buttonProps } from '@/types/type';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  width: auto;
  height: 2.25rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.orange};
  color: ${props => props.theme.white};
  font-size: 1.25rem;
`;

const Button = (props: buttonProps) => {
  const { buttonName, onClick } = props;

  return <ButtonWrapper onClick={onClick}>{buttonName}</ButtonWrapper>;
};

export default Button;
