import { SearchProps } from '@/types/type';
import SearchIcon from '@/assets/icons/search-icon.svg';
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

const Search = (SearchProps: SearchProps) => {
  const { placeholder, onChange, searchFood } = SearchProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
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
      />

      <img src={SearchIcon} alt="icon" onClick={searchFood} />
    </SearchWrapper>
  );
};

export default Search;
