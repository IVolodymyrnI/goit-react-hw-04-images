import PropTypes from 'prop-types';
import { ButtonStyle } from './ButtonStyle';

export function Button({ onLoadMore }) {
  return (
    <ButtonStyle onClick={onLoadMore}>
      <label>Load more</label>
    </ButtonStyle>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
