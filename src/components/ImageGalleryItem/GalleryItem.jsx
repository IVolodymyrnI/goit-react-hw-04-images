import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { GalleryItemImage, GalleryItemStyle } from './GalleryItemStyle';

export function GalleryItem({
  image: { webformatURL, tags, id, largeImageURL },
}) {
  const [modalPhoto, setModalPhoto] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(prevState => !prevState);
  };

  const onImage = () => {
    setModalPhoto({ largeImageURL, tags });
    toggleModal();
  };

  return (
    <GalleryItemStyle>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        id={id}
        onClick={onImage}
      />
      {isOpenModal && (
        <Modal modalPhoto={modalPhoto} toggleModal={toggleModal} />
      )}
    </GalleryItemStyle>
  );
}

GalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
