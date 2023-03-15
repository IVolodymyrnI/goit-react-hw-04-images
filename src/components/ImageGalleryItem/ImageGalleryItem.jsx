import PropTypes from 'prop-types';
import {
  ImageGalleryItemImage,
  ImageGalleryItemStyle,
} from './ImageGalleryItemStyle';

export function ImageGalleryItem({ gallery }) {
  return gallery.map(({ id, webformatURL, tags }) => {
    return (
      <ImageGalleryItemStyle key={id}>
        <ImageGalleryItemImage src={webformatURL} alt={tags} id={id} />
      </ImageGalleryItemStyle>
    );
  });
}

ImageGalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
