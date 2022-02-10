import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styles';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ gallery, openModal }) {
  const galleryElements = gallery?.length
    ? gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            onClick={() => openModal(largeImageURL)}
          />
        );
      })
    : null;

  return <Gallery>{galleryElements}</Gallery>;
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
  openModal: PropTypes.func.isRequired,
};
