import styled, { keyframes, css } from 'styled-components';

const reveal = keyframes`
  from {
    transform: scale(0.001);
  }
  to {
    transform: scale(1);
  }
`;

const slide = keyframes`
  to {
    transform: translateX(1.5em);
  }
`;

export const Container = styled.div`
  font-size: 20px; /* change size here */
  position: relative;
  width: 4em;
  height: 1em;
  margin: 20px auto;
  padding-bottom: 40px;

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 50 %;
      left: 50 %;
      transform: translate(-50 %, -50 %);
    `}
`;

export const Ellips = styled.span`
  display: block;
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  background-color: #3f51b5;
  position: absolute;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

  &:nth-child(1),
  &:nth-child(2) {
    left: 0;
  }

  &:nth-child(3) {
    left: 1.5em;
  }

  &:nth-child(4) {
    left: 3em;
  }

  &:nth-child(1) {
    animation-name: ${reveal};
  }

  &:nth-child(2),
  &:nth-child(3) {
    animation-name: ${slide};
  }

  &:nth-child(4) {
    animation-name: ${reveal};
    animation-direction: reverse;
  }
`;
