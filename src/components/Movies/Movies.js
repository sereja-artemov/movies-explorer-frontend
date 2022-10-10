import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({moviesData}) => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesData={moviesData} />
    </section>
  );
};

export default Movies;
