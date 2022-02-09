import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  LabelButton,
  ButtonSubmit,
  Form,
  InputSearch,
  SearchbarContainer,
} from './Searchbar.styles';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchQuery.toLowerCase());
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SearchbarContainer>
        <Form onSubmit={this.handleSubmit}>
          <ButtonSubmit>
            <LabelButton>
              <AiOutlineSearch size={24} />
            </LabelButton>
          </ButtonSubmit>

          <InputSearch value={searchQuery} onChange={this.handleChange} />
        </Form>
      </SearchbarContainer>
    );
  }
}
