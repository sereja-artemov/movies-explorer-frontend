import React, {useEffect, useState} from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";

const Movies = ({ moviesData, savedMoviesData, onSearch, onFilter, onSaveMovie, onRemoveSavedMovie, setIsLoading }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [isShort, setShort] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState([]);

  useEffect(() => {
    const getResults = async () => {
      setIsLoading(true);
      const results = await onSearch(moviesData, searchQuery);
      setSearchResults(results);
      setIsLoading(false)
    }
    getResults().then();
  }, [searchQuery]);

  useEffect(() => {
    const results = onFilter(searchResults, isShort);
    setFilteredResults(results);
  }, [searchResults, isShort]);


  function handleSearchQuery(query) {
    setSearchQuery(query);
  }

  function handleCheckboxClick(event) {
    setShort(event.target.checked);
  }

  return (
    <>
      <Header />
      <section className="movies">
        <SearchForm
          onSearch={handleSearchQuery}
          onCheckboxClick={handleCheckboxClick}
          isShort={isShort}
          savedMoviesData={savedMoviesData}
        />
        <MoviesCardList
          savedAppearance={true}
          cards={filteredResults}
          onSaveMovie={onSaveMovie}
          savedMoviesData={savedMoviesData}
          onRemoveSavedMovie={onRemoveSavedMovie}
        />
      </section>
    </>
  );
};

export default Movies;
