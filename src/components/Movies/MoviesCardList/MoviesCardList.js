import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import filmTest from "../../../images/film-test.jpg";
import filmTest2 from "../../../images/film-test-2.jpg";
import Preloader from "../Preloader/Preloader";
import { MOVIES_SERVER_URL } from "../../../utils/constants";
import { toHoursAndMinutes } from "../../../utils/timeConverter";

const MoviesCardList = ({moviesData}) => {
  return (
    <>
      <ul className="movies__list">

        { moviesData.length === 0 ? <Preloader /> :
          moviesData.map((movie) => {
            return <MoviesCard
              key={movie.id}
              imgLink={MOVIES_SERVER_URL + movie.image.url}
              imgAlt={movie.nameRU}
              name={movie.nameRU}
              duration={toHoursAndMinutes(movie.duration)}
              isSaved="movies-card__save--saved"
            />
          })
        }

      </ul>
      <button type="button" className="movies__btn btn--stroke">Еще</button>
    </>
  );
};

export default MoviesCardList;
