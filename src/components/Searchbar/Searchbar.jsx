import { Formik } from 'formik';
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchFormInput,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchForm,
  SearchbarStyle,
} from './SearchbarStyle';

class Searchbar extends Component {
  onSubmit = (value, { resetForm }) => {
    this.props.onSearch(value);
    resetForm();
  };

  render() {
    return (
      <Formik onSubmit={this.onSubmit} initialValues={{ image: '' }}>
        <SearchbarStyle>
          <SearchForm>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
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
}

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
