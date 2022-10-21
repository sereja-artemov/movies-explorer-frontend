import React, { useEffect, useState } from "react";
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
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isShort, setIsShort] = useState(false);

  // const localStorageMoviesObj = JSON.parse(localStorage.getItem('moviesPageData'));
  //
  // useEffect(() => {
  //   if (localStorage.getItem('moviesPageData')) {
  //     setIsShort(localStorageMoviesObj.checked);
  //     setSearchQuery(localStorageMoviesObj.keyword);
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   const localStorageMoviesData = {
  //     checked: isShort,
  //     keyword: searchQuery,
  //   }
  //   localStorage.setItem('moviesPageData', JSON.stringify(localStorageMoviesData));
  //
  // }, [isShort, searchQuery])

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
      />
      <MoviesCardList savedMovies={savedMovies} isLoading={isLoading} setIsLoading={setIsLoading} filteredMovies={filteredMovies} searchMovies={searchMovies} isSavePageTemplate={false} />
    </section>
  );
};

export default Movies;
