import { ModalStyle, Overlay } from './ModalStyle';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, modalPhoto: { largeImageURL, tags } }) => {
  const onClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onClose);
    return () => window.removeEventListener('keydown', onClose);
  });

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalStyle>
        <img src={largeImageURL} alt={tags} />
      </ModalStyle>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  modalPhoto: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  toggleModal: PropTypes.func.isRequired,
};
