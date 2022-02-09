import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import React, { Component } from 'react';
import { AppContainer } from './App.styles';
import Modal from 'components/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    isNewRequest: false,
    showModal: false,
    imageSrcModal: '',
  };

  onSubmit = async searchQuery => {
    if (!searchQuery?.trim()) {
      toast.error('Please enter search parameters.');
      return;
    }

    this.setState({ searchQuery, isNewRequest: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getImageSrcModal = imageSrcModal => this.setState({ imageSrcModal });

  toggleStatusRequest = () => {
    this.setState(({ isNewRequest }) => ({ isNewRequest: !isNewRequest }));
  };

  render() {
    const { searchQuery, isNewRequest, showModal, imageSrcModal } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          isNewRequest={isNewRequest}
          toggleStatusRequest={this.toggleStatusRequest}
          toggleModal={this.toggleModal}
          getImageSrcModal={this.getImageSrcModal}
        />
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
