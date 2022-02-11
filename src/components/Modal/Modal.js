import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Image, ModalWindow } from './Modal.styles';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader';

const modalRoot = document.querySelector('#modal-root');
const html = document.querySelector('html');

export default function Modal({ onClose, imageSrcModal }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handelKeyDownEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handelKeyDownEsc);
    html.classList.add('disable-scroll');

    return () => {
      window.removeEventListener('keydown', handelKeyDownEsc);
      html.classList.remove('disable-scroll');
    };
  }, [onClose]);

  const handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handelBackdropClick}>
      <ModalWindow>
        {!isLoaded && <Loader absolute />}
        <Image
          src={imageSrcModal}
          alt="Large"
          onLoad={() => setIsLoaded(true)}
        />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageSrcModal: PropTypes.string.isRequired,
};
