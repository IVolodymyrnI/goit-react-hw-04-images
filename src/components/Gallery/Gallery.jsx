import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/GalleryItem';
import { GalleryStyle } from './GalleryStyle';

export function Gallery({ gallery, onImage }) {
  return (
    <GalleryStyle onClick={onImage}>
      <GalleryItem gallery={gallery} />
    </GalleryStyle>
  );
}

Gallery.propTypes = {
  onImage: PropTypes.func.isRequired,
};
