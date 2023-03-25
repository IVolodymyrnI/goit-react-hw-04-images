import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/GalleryItem';
import { GalleryStyle } from './GalleryStyle';

export function Gallery({ gallery }) {
  return (
    <GalleryStyle>
      {gallery.map(image => (
        <GalleryItem key={image.id} image={image} />
      ))}
    </GalleryStyle>
  );
}

Gallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
