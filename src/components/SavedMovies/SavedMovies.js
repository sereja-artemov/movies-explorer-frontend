import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { getSavedMovies } from "../../utils/MoviesApi";

const SavedMovies = ({
  savedMovies,
  setFilteredMovies,
  searchMovies,
  isLoading,
  setIsLoading,
  filteredMovies,
  handleDeleteMovie,
}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const filteredMovies = searchMovies(savedMovies, searchQuery, isShort, true);
    setFilteredMovies(filteredMovies);
  }, [searchQuery, isShort, savedMovies]);

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
        handleDeleteMovie={handleDeleteMovie}
      />
    </section>
  );
};

export default SavedMovies;
