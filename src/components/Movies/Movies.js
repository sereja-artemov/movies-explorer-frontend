import React, {useEffect, useState} from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({moviesData, isLoading, savedMoviesArr}) => {

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const localStorageMoviesObj = JSON.parse(localStorage.getItem('moviesPageData'));

  useEffect(() => {
    if (localStorage.getItem('moviesPageData')) {
      setIsChecked(localStorageMoviesObj.checked);
      setSearchKeyword(localStorageMoviesObj.keyword);
      setFilteredArray(localStorageMoviesObj.moviesArr);
    }
  }, [])

  useEffect(() => {
    const localStorageMoviesData = {
      checked: isChecked,
      moviesArr: filteredArray,
      keyword: searchKeyword,
    }
    localStorage.setItem('moviesPageData', JSON.stringify(localStorageMoviesData));

  }, [isChecked, searchKeyword, filteredArray])

  //Поиск по ключевому слову
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
      <SearchForm
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        sortArray={sortArray}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        localStorageMoviesObj={localStorageMoviesObj}
      />
      <MoviesCardList
        savedMoviesArr={savedMoviesArr}
        isLoading={isLoading}
        filteredArray={filteredArray}
      />
    </section>
  );
};

export default Movies;
