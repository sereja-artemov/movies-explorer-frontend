import React from 'react';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import {useEffect, useState} from "react";
import {getSavedMovies} from "../../utils/MoviesApi";

const SavedMovies = ({ savedMoviesData, onSearch, onFilter, onRemoveSavedMovie }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShort, setShort] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const results = await onSearch(savedMoviesData, searchQuery);
      setSearchResults(results);
    }
    getResults().then();
  }, [searchQuery, savedMoviesData]);

  useEffect(() => {
    const results = onFilter(searchResults, isShort);
    setFilteredResults(results);
  }, [searchResults, isShort, savedMoviesData]);

  function handleSearchQuery(query) {
    setSearchQuery(query);
  }

  function handleCheckboxClick(event) {
    setShort(event.target.checked);
  }

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearchQuery}
        isShort={isShort}
        onCheckboxClick={handleCheckboxClick}
      />
      <MoviesCardList
        isSavedTemplate={true}
        savedMoviesData={savedMoviesData}
        cards={filteredResults}
        onRemoveSavedMovie={onRemoveSavedMovie}
      />
    </section>
  );
};

export default SavedMovies;
