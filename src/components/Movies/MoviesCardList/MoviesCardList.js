import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import filmTest from "../../../images/film-test.jpg";
import filmTest2 from "../../../images/film-test-2.jpg";
import { moviesData } from "../../../utils/data";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = () => {
  return (
    <>
      {/*<Preloader />*/}
      <ul className="movies__list">
        { moviesData.map((movie) => {
          return <MoviesCard
            key={movie.id}
            imgLink={movie.img.small.url}
            imgAlt={movie.nameRU}
            name={movie.nameRU}
            duration={movie.duration}
            isSaved="movies-card__save--saved"
          />
        }) }
        <MoviesCard
          imgLink={filmTest}
          imgAlt="33 слова о дизайне"
          name="33 слова о дизайне"
          duration="1ч 17м"
          isSaved="movies-card__save--saved"
        />
        <MoviesCard
          imgLink={filmTest2}
          imgAlt="Киноальманах «100 лет дизайна»"
          name="Киноальманах «100 лет дизайна»"
          duration="1ч 17м"
        />
      </ul>
      <button type="button" className="movies__btn btn--stroke">Еще</button>
    </>
  );
};

export default MoviesCardList;
