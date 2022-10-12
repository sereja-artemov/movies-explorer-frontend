import React from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  );
};

export default SavedMovies;
