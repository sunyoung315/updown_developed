import { monthProps } from '@/types/type';
import styled from 'styled-components';

const Month = styled.label<{ $month: number; $value: number }>`
  width: auto;
  line-height: 2.5rem;
  font-size: 1.13rem;
  text-align: center;
  border-radius: 0.5rem;
  margin: 0.3rem;
  background-color: ${props =>
    props.$month === props.$value ? props.theme.grey : props.theme.transparent};
  color: ${props =>
    props.$month === props.$value ? props.theme.white : props.theme.black};
`;

const MonthRadio = ({ selectedMonth, changeMonth, value }: monthProps) => {
  return (
    <>
      <Month htmlFor={String(value)} $month={selectedMonth} $value={value}>
        {value}월
      </Month>
      <input
        type="radio"
        id={String(value)}
        name="month"
        value={value}
        style={{ display: 'none' }}
        onChange={changeMonth}
      />
    </>
  );
};

export default MonthRadio;
