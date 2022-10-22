import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({
  moviesData,
  savedMovies,
  searchMovies,
  filteredMovies,
  setFilteredMovies,
  isLoading,
  setIsLoading,
  setSavedMovies,
  handleSaveMovie,
  setInputValue,
  searchQuery,
  setIsShort,
  setSearchQuery,
  isShort,
  inputValue,
}) => {
  useEffect(() => {
    if (localStorage.getItem("inputValue")) {
      const value = localStorage.getItem("inputValue");
      setInputValue(value);
      setSearchQuery(value);
    }
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(moviesData, searchQuery, isShort);
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
      />
      <MoviesCardList
        handleSaveMovie={handleSaveMovie}
        setSavedMovies={setSavedMovies}
        isShort={isShort}
        searchQuery={searchQuery}
        savedMovies={savedMovies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filteredMovies={filteredMovies}
        searchMovies={searchMovies}
        isSavePageTemplate={false}
      />
    </section>
  );
};

export default Movies;
