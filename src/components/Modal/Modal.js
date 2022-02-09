import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Image, ModalWindow } from './Modal.styles';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader';

const modalRoot = document.querySelector('#modal-root');
const html = document.querySelector('html');

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imageSrcModal: PropTypes.string.isRequired,
  };

  state = {
    isLoaded: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDownEsc);
    html.classList.add('disable-scroll');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDownEsc);
    html.classList.remove('disable-scroll');
  }

  handelKeyDownEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleLoad = e => {
    this.setState({ isLoaded: true });
  };

  render() {
    const { imageSrcModal } = this.props;
    const { isLoaded } = this.state;

    return createPortal(
      <Backdrop onClick={this.handelBackdropClick}>
        <ModalWindow>
          {!isLoaded && <Loader absolute />}
          <Image src={imageSrcModal} alt="Large" onLoad={this.handleLoad} />
        </ModalWindow>
      </Backdrop>,
      modalRoot
    );
  }
}
