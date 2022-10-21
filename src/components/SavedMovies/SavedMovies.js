import React from 'react';
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import {useEffect, useState} from "react";
import {getSavedMovies} from "../../utils/MoviesApi";

const SavedMovies = ({ isLoading, savedMoviesArr, setSavedMoviesArr, savedFilteredArray, setSavedFilteredArray }) => {

  const [searchKeyword, setSearchKeyword] = useState('');


  const [isChecked, setIsChecked] = useState(false);
  const localStorageMoviesObj = JSON.parse(localStorage.getItem('savedMoviesPageData'));

  useEffect(() => {

    if (localStorage.getItem('savedMoviesPageData')) {
      setIsChecked(localStorageMoviesObj.checked);
      setSearchKeyword(localStorageMoviesObj.keyword);
    }
  }, [])

  useEffect(() => {
    const localStorageMoviesData = {
      checked: isChecked,
      keyword: searchKeyword,
    }
    localStorage.setItem('savedMoviesPageData', JSON.stringify(localStorageMoviesData));

  }, [isChecked, searchKeyword])

  //Поиск по ключевому слову
  function sortArray(event) {
    event.preventDefault();

    const filteredArr = savedMoviesArr.filter(movie => {
      if (isChecked && movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase()) && movie.duration <= 40) {
        return movie;
      } else if (!isChecked){
        return movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase());
      }
    })
    setSavedFilteredArray(filteredArr);
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
      <MoviesCardList filteredArray={savedFilteredArray} savedMoviesArr={savedMoviesArr} isLoading={isLoading} />
    </section>
  );
};

export default SavedMovies;
