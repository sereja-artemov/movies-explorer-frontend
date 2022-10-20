import React, {useEffect, useState} from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({ moviesData, savedMoviesData, onSearch, onFilter, onSaveMovie, onRemoveSavedMovie, setIsLoading, isLoading }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShort, setShort] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

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
      <section className="movies">
        <SearchForm
          onSearch={handleSearchQuery}
          onCheckboxClick={handleCheckboxClick}
          isShort={isShort}
        />
        <MoviesCardList
          isSavedTemplate={false}
          cards={filteredResults}
          onSaveMovie={onSaveMovie}
          savedMoviesData={savedMoviesData}
          onRemoveSavedMovie={onRemoveSavedMovie}
          isLoading={isLoading}
        />
      </section>
    </>
  );
};

export default Movies;
