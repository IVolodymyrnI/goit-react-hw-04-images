import PropTypes from 'prop-types';
import { GalleryItemImage, GalleryItemStyle } from './GalleryItemStyle';

export function GalleryItem({ gallery }) {
  return gallery.map(({ id, webformatURL, tags }) => {
    return (
      <GalleryItemStyle key={id}>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          id={id}
        />
      </GalleryItemStyle>
    );
  });
}

GalleryItem.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
