import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { getSavedMovies } from "../../utils/MoviesApi";

const SavedMovies = ({
  inputValue,
  setInputValue,
  setSearchQuery,
  savedMovies,
  setFilteredMovies,
  searchMovies,
  searchQuery,
  isShort,
  savedPageLocalStorage
}) => {

  useEffect(() => {
    if (localStorage.getItem('inputValueSavedPage')) {
      const value = localStorage.getItem('inputValueSavedPage');
      setInputValue(value);
      setSearchQuery(value);
    }
  }, [])

  useEffect(() => {
    const filteredMovies = searchMovies(savedMovies, searchQuery, isShort);
    setFilteredMovies(filteredMovies);
  }, [searchQuery, isShort]);

  return (
    <section className="movies">
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSearchQuery={setSearchQuery}
        savedPageLocalStorage={true}
      />
      <MoviesCardList />
    </section>
  );
};

export default SavedMovies;
