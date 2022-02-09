import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styles';

export default function Button({ onClick, disabled = false }) {
  return (
    <ButtonLoadMore onClick={onClick} disabled={disabled}>
      Load more
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
