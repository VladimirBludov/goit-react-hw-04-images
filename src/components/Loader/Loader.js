import PropTypes from 'prop-types';
import { Container, Ellips } from './Loader.styles';

export default function Loader({ absolute = false }) {
  return (
    <Container absolute={absolute}>
      <Ellips></Ellips>
      <Ellips></Ellips>
      <Ellips></Ellips>
      <Ellips></Ellips>
    </Container>
  );
}

Loader.propTypes = {
  absolute: PropTypes.bool,
};
