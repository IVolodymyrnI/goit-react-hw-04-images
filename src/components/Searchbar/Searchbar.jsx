import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  SearchFormInput,
  SearchFormButton,
  SearchIcon,
  SearchForm,
  SearchbarStyle,
} from './SearchbarStyle';

export function Searchbar({ onSearch }) {
  const onSubmit = value => {
    onSearch(value);
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ image: '' }}>
      <SearchbarStyle>
        <SearchForm>
          <SearchFormButton type="submit">
            <SearchIcon />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="image"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyle>
    </Formik>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
