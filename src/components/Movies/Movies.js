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
  handleRemoveSavedMovie,
}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //заполняем результаты поиска из localStorage
  useEffect(() => {
    if (localStorage.getItem('moviesSearchResults')) {
      const moviesSearchResults = JSON.parse(localStorage.getItem('moviesSearchResults'));
      setInputValue(moviesSearchResults.searchQuery);
      setSearchQuery(moviesSearchResults.searchQuery);
      setIsShort(moviesSearchResults.isShort);
      setFilteredMovies(moviesSearchResults.movies);
    }
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(moviesData, searchQuery, isShort);
    setFilteredMovies(filteredMovies);
    localStorage.setItem('moviesSearchResults', JSON.stringify({ movies: filteredMovies, searchQuery: searchQuery, isShort: isShort }))
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
        handleRemoveSavedMovie={handleRemoveSavedMovie}
      />
    </section>
  );
};

export default Movies;
