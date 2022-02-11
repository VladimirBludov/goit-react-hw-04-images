import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/pixabay-api';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import { AppContainer, Warning } from './App.styles';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';

const PER_PAGE = 12;

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageSrcModal, setImageSrcModal] = useState('');

  const disabled = error ? true : false;
  const isCollection = gallery.length > 0 ? true : false;

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getPictures = async () => {
      setIsLoading(true);

      try {
        const response = await api.fetchPictures(searchQuery, page);

        if (response?.data?.hits) {
          const { hits } = response.data;

          setGallery(gallery => [...gallery, ...hits]);
          setError('');

          if (hits.length < PER_PAGE) {
            setError('You have reached the end of the collection.');
          } else setError('');

          smoothScroll(page);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPictures();
  }, [searchQuery, page]);

  const smoothScroll = nextPage => {
    const heightGalleryItem = 260;

    if (nextPage > 1) {
      window.scrollBy({
        top: heightGalleryItem * 2,
        behavior: 'smooth',
      });
    }
  };

  const onSubmit = newSearchQuery => {
    if (!newSearchQuery.trim()) {
      toast.error('Please enter search parameters.');
      return;
    }

    if (newSearchQuery === searchQuery) {
      toast.warn('You are already on the page of this collection.');
      return;
    }
    setPage(1);
    setGallery([]);
    setSearchQuery(newSearchQuery);
  };

  const openModal = imageSrcModal => {
    setImageSrcModal(imageSrcModal);
    setShowModal(true);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery gallery={gallery} openModal={openModal} />
      {isLoading && <Loader />}
      {error && <Warning>{error}</Warning>}
      {isCollection && (
        <Button onClick={() => setPage(page => page + 1)} disabled={disabled} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          imageSrcModal={imageSrcModal}
        />
      )}
    </AppContainer>
  );
}
