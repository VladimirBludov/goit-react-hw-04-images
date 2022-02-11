import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  LabelButton,
  ButtonSubmit,
  Form,
  InputSearch,
  SearchbarContainer,
} from './Searchbar.styles';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchQuery.toLowerCase());
    setSearchQuery('');
  };

  return (
    <SearchbarContainer>
      <Form onSubmit={handleSubmit}>
        <ButtonSubmit>
          <LabelButton>
            <AiOutlineSearch size={24} />
          </LabelButton>
        </ButtonSubmit>

        <InputSearch value={searchQuery} onChange={handleChange} />
      </Form>
    </SearchbarContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
