import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import {createMovie, getSavedMovies} from "../../../utils/MoviesApi";
import {MOVIES_SERVER_URL} from "../../../utils/constants";
import {toHoursAndMinutes} from "../../../utils/timeConverter";

const MoviesCard = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  nameRU,
  nameEN,
  id: movieId,
  card,
  isSavedTemplate,
  onDelete,
  onRemoveSave,
  onSaveMovie,
  isSavedMovie,
  _id,
}) => {
  const [isSaved, setIsSaved] = useState(isSavedMovie);

  const cardSaveButtonClassName = `movies-card__save ${
    isSaved ? "movies-card__save--saved" : ""
  }`;

  function handleDelete() {
    onDelete(_id);
  }

  function handleLike() {
    if (!isSaved) {
      onSaveMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        movieId,
        nameRU,
        nameEN,
        trailerLink
      );
      setIsSaved(true);
    } else {
      onRemoveSave(movieId);
      setIsSaved(false);
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
