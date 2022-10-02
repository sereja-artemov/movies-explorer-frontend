import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import filmTest from "../../../images/film-test.jpg"
import filmTest2 from "../../../images/film-test-2.jpg"

const MoviesCardList = () => {
    return (
        <ul className="movies-list">
            <MoviesCard imgLink={filmTest} imgAlt="33 слова о дизайне" name="33 слова о дизайне" duration="1ч 17м" isSaved="movies-card__save--saved" />
            <MoviesCard imgLink={filmTest2} imgAlt="Киноальманах «100 лет дизайна»" name="Киноальманах «100 лет дизайна»" duration="1ч 17м" />
        </ul>
    );
};

export default MoviesCardList;
