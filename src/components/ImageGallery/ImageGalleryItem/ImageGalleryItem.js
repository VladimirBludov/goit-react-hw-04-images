import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Picture } from './ImageGalleryItem.styles';

export default function ImageGalleryItem({ src, alt, onClick, largeImageURL }) {
  return (
    <GalleryItem onClick={onClick} data-large-src={largeImageURL}>
      <Picture src={src} alt={alt} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
