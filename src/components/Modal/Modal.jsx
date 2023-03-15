import { ModalStyle, Overlay } from './ModalStyle';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  onClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  render() {
    const {
      largeImage: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <Overlay onClick={this.onClose}>
        <ModalStyle>
          <img src={largeImageURL} alt={tags} />
        </ModalStyle>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  toggleModal: PropTypes.func.isRequired,
};
