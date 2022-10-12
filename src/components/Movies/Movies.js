import React, {useEffect, useState} from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({moviesData, windowInnerWidth, isLoading}) => {

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(localStorageMoviesObj.checked);
  }, [])

  useEffect(() => {

    const localStorageMoviesData = {
      checked: isChecked,
      moviesArr: filteredArray,
      keyword: searchKeyword,
    }
    localStorage.setItem('moviesPageData', JSON.stringify(localStorageMoviesData));

  }, [isChecked, filteredArray, searchKeyword])


   const localStorageMoviesObj = JSON.parse(localStorage.getItem('moviesPageData'));
  console.log(localStorageMoviesObj)
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
      <SearchForm setSearchKeyword={setSearchKeyword} sortArray={sortArray} setIsChecked={setIsChecked} isChecked={isChecked} localStorageMoviesObj={localStorageMoviesObj}/>
      <MoviesCardList windowInnerWidth={windowInnerWidth} isLoading={isLoading} filteredArray={filteredArray} />
    </section>
  );
};

export default Movies;
