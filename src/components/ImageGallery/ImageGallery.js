import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/pixabay-api';
import { Gallery, Warning } from './ImageGallery.styles';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';

const INITIAL_STATE = {
  gallery: [],
  page: 1,
  error: '',
  status: 'idle',
  totalItems: null,
};

export default class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    isNewRequest: PropTypes.bool.isRequired,
    toggleStatusRequest: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    getImageSrcModal: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };

  componentDidMount() {
    const searchQuery = this.props.searchQuery;
    const { page } = this.state;

    this.getPictures(searchQuery, page);
  }

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchQuery;
    const prevSearchQuery = prevProps.searchQuery;
    const { page } = this.state;

    if (this.props.isNewRequest) {
      this.reset();
      this.props.toggleStatusRequest();
    }

    if (prevState.page !== page || prevSearchQuery !== searchQuery) {
      await this.getPictures(searchQuery, page);

      const isFinish = this.checkFinishCollections();
      this.setState(prevState => ({
        status: isFinish ? 'finish' : prevState.status,
      }));
    }
  }

  getPictures = async (nextSearchQuery, nextPage) => {
    this.setState({ status: 'pending' });

    try {
      const response = await api.fetchPictures(nextSearchQuery, nextPage);

      if (response?.data?.hits) {
        const { hits, totalHits } = response.data;

        this.setState(({ gallery }) => ({
          gallery: [...gallery, ...hits],
          totalItems: totalHits,
          status: 'resolved',
          error: '',
        }));
        this.smoothScroll(nextPage);
      }
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
    }
  };

  reset = () => this.setState({ ...INITIAL_STATE });

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  checkFinishCollections = () => {
    const { gallery, totalItems } = this.state;

    return totalItems && gallery.length === totalItems;
  };

  smoothScroll = nextPage => {
    if (nextPage > 1) {
      window.scrollBy({
        top: 260 * 2,
        behavior: 'smooth',
      });
    }
  };

  openModal = e => {
    const { getImageSrcModal, toggleModal } = this.props;
    const imageSrcModal = e.currentTarget.dataset.largeSrc;

    getImageSrcModal(imageSrcModal);
    toggleModal();
  };

  createGalleryList = gallery => {
    return gallery.length
      ? gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              onClick={this.openModal}
              key={id}
              src={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
            />
          );
        })
      : null;
  };

  render() {
    const { gallery, error, status } = this.state;
    const galleryElements = this.createGalleryList(gallery);

    if (status === 'idle' || status === 'resolved') {
      return (
        <>
          <Gallery>{galleryElements}</Gallery>
          <Button onClick={this.loadMore} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Gallery>{galleryElements}</Gallery>
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return <Warning>{error}</Warning>;
    }

    if (status === 'finish') {
      return (
        <>
          <Gallery>{galleryElements}</Gallery>
          <Warning>You have reached the end of the image collection.</Warning>
          <Button disabled />
        </>
      );
    }
  }
}
