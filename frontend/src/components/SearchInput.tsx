import { searchProps } from '@/types/type';
import { SearchIcon } from '@/assets/icons';
import styled from 'styled-components';

const SearchWrapper = styled.label`
  background-color: ${props => props.theme.lightgrey};
  border-radius: 0.5rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.2rem 1.1rem;
`;

const InputBox = styled.input`
  width: 100%;
  font-size: 1rem;
`;

const SearchInput = (searchProps: searchProps) => {
  const { placeholder, onChange, search } = searchProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  };

  return (
    <SearchWrapper htmlFor="input">
      <InputBox
        type="text"
        id="input"
        placeholder={placeholder}
        onChange={handleChange}
        size={27}
        onKeyDown={handleEnter}
      />
      <button onClick={search}>
        <SearchIcon color="grey" />
      </button>
    </SearchWrapper>
  );
};

export default SearchInput;
