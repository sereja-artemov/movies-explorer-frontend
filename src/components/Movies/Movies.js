import React, {useEffect, useState} from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({moviesData, windowInnerWidth, isLoading}) => {

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isSaveOnLocalStorage, setIsSaveOnLocalStorage] = useState(false);

  const localStorageMoviesData = {
    checked: isChecked,
    moviesArr: filteredArray,
    keyword: searchKeyword,
  }
  localStorage.setItem('moviesPageData', JSON.stringify(localStorageMoviesData));

   const localStorageMovies = JSON.parse(localStorage.getItem('moviesPageData'));

  function sortArray(event) {
    event.preventDefault();
    const filteredArr = moviesData.filter(movie => {
      if (isChecked && movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase()) && movie.duration <= 40) {
        return movie;
      } else if (!isChecked){
        return movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase());
      }
    })
    setFilteredArray(filteredArr);
  }

  return (
    <section className="movies">
      <SearchForm setSearchKeyword={setSearchKeyword} sortArray={sortArray} setIsChecked={setIsChecked} isChecked={isChecked} localStorageMovies={localStorageMovies}/>
      <MoviesCardList moviesData={moviesData} windowInnerWidth={windowInnerWidth} isLoading={isLoading} filteredArray={filteredArray} />
    </section>
  );
};

export default Movies;
