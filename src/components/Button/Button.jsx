import PropTypes from 'prop-types';
import { ButtonStyle } from './ButtonStyle';
import { Loader } from 'components/Loader/Loader';
import { status } from 'constants';

const { REJECTED, RESOLVED, PENDING, IDLE } = status;

export function Button({ onLoadMore, status }) {
  if (status === REJECTED || status === IDLE) {
    return null;
  }

  if (status === PENDING) {
    return <Loader />;
  }

  if (status === RESOLVED) {
    return (
      <ButtonStyle onClick={onLoadMore}>
        <label>Load more</label>
      </ButtonStyle>
    );
  }
}

Button.propTypes = {
  status: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func,
};
