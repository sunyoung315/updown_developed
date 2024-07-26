import { buttonRadioProps } from '@/types/type';
import styled from 'styled-components';

const Label = styled.label<{ $type: string; $value: string }>`
  display: inline-block;
  width: 3.7rem;
  height: 1.9rem;
  line-height: 1.9rem;
  border-radius: 1rem;
  text-align: center;
  font-size: 1rem;
  background-color: ${props =>
    props.$type === props.$value
      ? props.$type === 'diet'
        ? props.theme.orange
        : props.$type === 'exercise'
          ? props.theme.blue
          : props.$type === 'weight'
            ? props.theme.darkgreen
            : props.theme.lightgrey
      : props.theme.lightgrey};
  color: ${props =>
    props.$type === props.$value ? props.theme.white : props.theme.grey};
`;

const ButtonRadio = ({ type, changeType, value }: buttonRadioProps) => {
  return (
    <Label htmlFor={type} $type={type} $value={value}>
      {type === 'diet'
        ? '식단'
        : type === 'exercise'
          ? '운동'
          : type === 'weight'
            ? '몸무게'
            : ''}
      <input
        type="radio"
        name="type"
        id={type}
        value={type}
        onChange={changeType}
        style={{ display: 'none' }}
      />
    </Label>
  );
};

export default ButtonRadio;
