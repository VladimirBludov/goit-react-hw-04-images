import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/pixabay-api';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import React, { Component } from 'react';
import { AppContainer, Warning } from './App.styles';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';

const INITIAL_STATE = {
  gallery: [],
  page: 1,
  error: '',
  isLoading: false,
  searchQuery: '',
  showModal: false,
  imageSrcModal: '',
};

class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.state.searchQuery;
    const prevSearchQuery = prevState.searchQuery;
    const { page } = this.state;

    if (prevState.page !== page || prevSearchQuery !== searchQuery) {
      this.getPictures(searchQuery, page);
    }
  }

  getPictures = async (nextSearchQuery, nextPage) => {
    this.setState({ isLoading: true });

    try {
      const response = await api.fetchPictures(nextSearchQuery, nextPage);

      if (response?.data?.hits) {
        const { hits, totalHits } = response.data;

        this.setState(({ gallery }) => ({
          gallery: [...gallery, ...hits],
          error: '',
        }));

        this.checkFinishCollections(totalHits);
        this.smoothScroll(nextPage);
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  checkFinishCollections = totalItems => {
    const { gallery } = this.state;
    if (gallery.length === totalItems) {
      this.setState({
        error: 'You have reached the end of the image collection.',
      });
    }
  };

  smoothScroll = nextPage => {
    const heightGalleryItem = 260;

    if (nextPage > 1) {
      window.scrollBy({
        top: heightGalleryItem * 2,
        behavior: 'smooth',
      });
    }
  };

  onSubmit = searchQuery => {
    if (!searchQuery.trim()) {
      toast.error('Please enter search parameters.');
      return;
    }

    if (searchQuery === this.state.searchQuery) {
      toast.warn('You are already on the page of this collection.');
      return;
    }
    this.reset();
    this.setState({ searchQuery });
  };

  reset = () => this.setState({ ...INITIAL_STATE });

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = imageSrcModal => {
    this.setState({ imageSrcModal });
    this.toggleModal();
  };

  render() {
    const { gallery, error, isLoading, showModal, imageSrcModal } = this.state;
    const disabled = error ? true : false;
    const isCollection = gallery.length > 0 ? true : false;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery gallery={gallery} openModal={this.openModal} />
        {isLoading && <Loader />}
        {error && <Warning>{error}</Warning>}
        {isCollection && <Button onClick={this.loadMore} disabled={disabled} />}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
        />
        {showModal && (
          <Modal onClose={this.toggleModal} imageSrcModal={imageSrcModal} />
        )}
      </AppContainer>
    );
  }
}

export default App;
