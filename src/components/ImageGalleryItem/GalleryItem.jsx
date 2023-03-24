import PropTypes from 'prop-types';
import { GalleryItemImage, GalleryItemStyle } from './GalleryItemStyle';

export function GalleryItem({ webformatURL, tags, id }) {
  return (
    <GalleryItemStyle>
      <GalleryItemImage src={webformatURL} alt={tags} id={id} />
    </GalleryItemStyle>
  );
}

GalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
