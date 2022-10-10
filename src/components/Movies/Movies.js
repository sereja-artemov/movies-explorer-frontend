import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({moviesData, windowInnerWidth}) => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesData={moviesData} windowInnerWidth={windowInnerWidth} />
    </section>
  );
};

export default Movies;
