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
  setIsShort,
  isLoading,
  setIsLoading,
  filteredMovies,
}) => {
  useEffect(() => {
    if (localStorage.getItem("inputValueSavedPage")) {
      const value = localStorage.getItem("inputValueSavedPage");
      setInputValue(value);
      setSearchQuery(value);
    }
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(savedMovies, searchQuery, isShort);

    setFilteredMovies(filteredMovies);
  }, [searchQuery, isShort]);

  return (
    <section className="movies">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={setIsShort}
        inputValue={inputValue}
        setInputValue={setInputValue}
        savedPageLocalStorage={true}
      />
      <MoviesCardList
        isSavePageTemplate={true}
        savedMovies={savedMovies}
        isShort={isShort}
        searchQuery={searchQuery}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filteredMovies={filteredMovies}
        searchMovies={searchMovies}
      />
    </section>
  );
};

export default SavedMovies;
