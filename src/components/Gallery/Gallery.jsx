import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/GalleryItem';
import { GalleryStyle } from './GalleryStyle';

export function Gallery({ gallery, onImage }) {
  return (
    <GalleryStyle onClick={onImage}>
      {gallery.map(({ id, webformatURL, tags }) => {
        return (
          <GalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
          />
        );
      })}
    </GalleryStyle>
  );
}

Gallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImage: PropTypes.func.isRequired,
};
