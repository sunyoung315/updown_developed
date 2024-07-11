import { inputProps } from '@/types/type';
import theme from '@/styles/theme';
import styled from 'styled-components';

const InputWrapper = styled.div<{ $inputdir?: string }>`
  display: ${props => (props.$inputdir === 'row' ? 'flex' : 'grid')};
  grid-template-columns: ${props =>
    props.$inputdir === 'column' ? 'repeat(2, 1fr)' : 'none'};
  align-items: ${props => (props.$inputdir === 'column' ? 'center' : 'none')};
  flex-direction: ${props => (props.$inputdir === 'row' ? 'column' : 'row')};
  gap: ${props => (props.$inputdir === 'row' ? '0.5rem' : '0')};
`;

const InputName = styled.span`
  font-size: 1.13rem;
`;

const InputLabel = styled.label<{ $isbig?: boolean; $signup?: boolean }>`
  background-color: ${props => props.theme.lightgrey};
  width: ${props =>
    !props?.$isbig ? '100%' : props?.$signup ? '12rem' : '15rem'};
  border-radius: 0.5rem;
  height: ${props => (props?.$isbig ? '5.5rem' : '2.94rem')};
  display: flex;
  align-items: center;
  padding: ${props => (props?.$isbig ? '0 1.3rem' : '0 0.7rem')};
`;

const InputBox = styled.input<{
  $inputnamecolor?: keyof typeof theme;
  $isbig?: boolean;
  $signup?: boolean;
}>`
  width: 100%;
  font-size: ${props =>
    !props?.$isbig ? '1.25rem' : props?.$signup ? '2.5rem' : '3.75rem'};
  color: ${props =>
    theme[props.$inputnamecolor ? props.$inputnamecolor : 'black']};
`;

const UnitWrapper = styled.span<{
  $inputnamecolor?: keyof typeof theme;
  $isbig?: boolean;
  $signup?: boolean;
}>`
  font-size: ${props =>
    !props?.$isbig ? '1.25rem' : props.$signup ? '2rem' : '2.8rem'};
  padding-left: 0.3rem;
  color: ${props =>
    theme[props.$inputnamecolor ? props.$inputnamecolor : 'black']};
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
    value,
    isBig,
    name,
    step,
    signup,
  } = inputProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === 'text') {
      onChange(e.target.value);
    } else {
      if (name) {
        // 0이 기본값으로 들어가 있을 때 0 자동 삭제
        if (e.target.value.length > 1 && e.target.value.startsWith('0')) {
          e.target.value = e.target.value.slice(1);
        }
        onChange({ name: e.target.name, value: Number(e.target.value) });
      } else {
        // 0이 기본값으로 들어가 있을 때 0 자동 삭제
        if (e.target.value.length > 1 && e.target.value.startsWith('0')) {
          e.target.value = e.target.value.slice(1);
        }
        onChange(Number(e.target.value));
      }
    }
  };

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
      <InputLabel htmlFor="input" $isbig={isBig} $signup={signup}>
        <InputBox
          type={inputType === 'text' ? 'text' : 'number'}
          id="input"
          placeholder={placeholder ? placeholder : '0'}
          onChange={handleChange}
          value={value}
          $inputnamecolor={inputNameColor}
          $isbig={isBig}
          name={name}
          step={step}
          $signup={signup}
        />
        {unit && (
          <UnitWrapper
            $inputnamecolor={inputNameColor}
            $isbig={isBig}
            $signup={signup}
          >
            {unit}
          </UnitWrapper>
        )}
      </InputLabel>
    </InputWrapper>
  );
};

export default Input;
