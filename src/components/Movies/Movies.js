import React, { useState } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({moviesData, windowInnerWidth, isLoading}) => {

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);

  function sortArray(event) {
    event.preventDefault();
    const filteredArr = moviesData.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase());
    })
    setFilteredArray(filteredArr);
  }

  return (
    <section className="movies">
      <SearchForm setSearchKeyword={setSearchKeyword} sortArray={sortArray} />
      <MoviesCardList moviesData={moviesData} windowInnerWidth={windowInnerWidth} isLoading={isLoading} filteredArray={filteredArray} />
    </section>
  );
};

export default Movies;
