import styled from 'styled-components';

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Warning = styled.div`
  width: 100%;
  padding: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  background-color: lightcoral;
`;
