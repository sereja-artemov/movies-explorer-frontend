import React, {useEffect, useState} from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({ moviesData, filterMovies, setFilteredMovies }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [isShort, setIsShort] = useState(false);

  // const localStorageMoviesObj = JSON.parse(localStorage.getItem('moviesPageData'));

  // useEffect(() => {
  //   if (localStorage.getItem('moviesPageData')) {
  //     setIsChecked(localStorageMoviesObj.checked);
  //     setSearchKeyword(localStorageMoviesObj.keyword);
  //     setFilteredArray(localStorageMoviesObj.moviesArr);
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   const localStorageMoviesData = {
  //     checked: isChecked,
  //     moviesArr: filteredArray,
  //     keyword: searchKeyword,
  //   }
  //   localStorage.setItem('moviesPageData', JSON.stringify(localStorageMoviesData));
  //
  // }, [isChecked, searchKeyword, filteredArray])

  useEffect(() => {
    const filteredMovies = filterMovies(moviesData, searchQuery, isShort);
    setFilteredMovies(filteredMovies);
  }, [searchQuery, isShort]);


  return (
    <section className="movies">
      <SearchForm
        setSearchQuery={setSearchQuery}
        isShort={isShort}
        setIsShort={setIsShort}
      />
      <MoviesCardList

      />
    </section>
  );
};

export default Movies;
