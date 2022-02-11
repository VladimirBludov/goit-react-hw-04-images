import PropTypes from 'prop-types';
import { GalleryItem, Picture } from './ImageGalleryItem.styles';

export default function ImageGalleryItem({ src, alt, onClick }) {
  return (
    <GalleryItem onClick={onClick}>
      <Picture src={src} alt={alt} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
