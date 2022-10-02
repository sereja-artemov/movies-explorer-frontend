import React from 'react';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = () => {
    return (
        <section className="movies container">
            <SearchForm />
            <MoviesCardList />
        </section>
    );
};

export default Movies;
