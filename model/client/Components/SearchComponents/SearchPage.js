import React, { Component } from 'react';
import NavBar from '../NavBar';
import SearchResultsList from './SearchResultsList';

const SearchPage = (props) => {
    return (
        <div>
          <NavBar />
          <SearchResultsList />
        </div>
    );
}

export default SearchPage;