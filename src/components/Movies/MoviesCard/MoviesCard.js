import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import {createMovie, getSavedMovies} from "../../../utils/MoviesApi";
import {MOVIES_SERVER_URL} from "../../../utils/constants";
import {toHoursAndMinutes} from "../../../utils/timeConverter";
import savedMovies from "../../SavedMovies/SavedMovies";

const MoviesCard = ({
  country,
  director,
  duration,
  year,
  description,
  trailerLink,
  nameRU,
  nameEN,
  movieId,
  image,
  thumbnail,
  card,
  isSavedTemplate,
  onDelete,
  onSaveMovie,
  isSavedMovie,
  _id
}) => {
  const [isSaved, setIsSaved] = useState(isSavedMovie);
  console.log(isSavedMovie)
  const cardSaveButtonClassName = `movies-card__save ${
    isSaved ? "movies-card__save--saved" : ""
  }`;
//баг с удалением фильмов
  function handleDelete() {
    onDelete(card);
  }

  function handleLike() {
    if (!isSaved) {
      onSaveMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
        trailerLink
      });
      setIsSaved(true);
    }
  }

  return (
    <li className="movies-card">
      <a
        rel="noreferrer noopener"
        href={trailerLink}
        target="_blank"
        className="movies-card__link"
      >
        <img src={image} alt={nameRU} className="movies-card__image" />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__name">{nameRU}</h2>
        <span className="movies-card__duration">{toHoursAndMinutes(duration)}</span>
      </div>
      {!isSavedTemplate ? (
        <button
          onClick={handleLike}
          type="button"
          className={cardSaveButtonClassName}
        >
          <span className="movies-card__save-text">Сохранить</span>
        </button>
      ) : (
        <button
          onClick={handleDelete}
          type="button"
          className="movies-card__delete"
        >
          {/*<span className="movies-card__save-text">Сохранить</span>*/}
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
