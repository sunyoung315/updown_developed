import { inputProps } from '@/types/type';
import theme from '@/styles/theme';
import styled from 'styled-components';

const InputWrapper = styled.div<{ $inputdir: string }>`
  display: ${props => (props.$inputdir === 'row' ? 'flex' : 'grid')};
  grid-template-columns: ${props =>
    props.$inputdir === 'column' ? 'repeat(2, 1fr)' : 'none'};
  align-items: ${props => (props.$inputdir === 'column' ? 'center' : 'none')};
  flex-direction: ${props => (props.$inputdir === 'row' ? 'column' : 'none')};
  gap: ${props => (props.$inputdir === 'row' ? '0.5rem' : '0')};
`;

const InputName = styled.span`
  font-size: 1.13rem;
`;

const InputLabel = styled.label`
  background-color: ${props => props.theme.lightgrey};
  border-radius: 0.5rem;
  height: 2.94rem;
  display: flex;
  align-items: center;
  padding: 0 0.7rem;
`;

const InputBox = styled.input`
  width: 100%;
  font-size: 1.25rem;
`;

const UnitWrapper = styled.span`
  font-size: 1.25rem;
  padding-left: 0.5rem;
`;

const Input = (inputProps: inputProps) => {
  const {
    inputDir,
    inputType,
    inputName,
    inputNameColor,
    placeholder,
    isRequired,
    unit,
    starColor,
    onChange,
  } = inputProps;

  return (
    <InputWrapper $inputdir={inputDir}>
      <InputName>
        <span
          style={{ color: theme[inputNameColor ? inputNameColor : 'black'] }}
        >
          {inputName}
        </span>
        {isRequired && (
          <span style={{ color: theme[starColor ? starColor : 'black'] }}>
            {' *'}
          </span>
        )}
      </InputName>
      <InputLabel htmlFor="input">
        <InputBox
          type={inputType === 'text' ? 'text' : 'number'}
          id="input"
          placeholder={placeholder ? placeholder : '0'}
          onChange={e => onChange(e.target.value)}
        />
        {unit && <UnitWrapper>{unit}</UnitWrapper>}
      </InputLabel>
    </InputWrapper>
  );
};

export default Input;
