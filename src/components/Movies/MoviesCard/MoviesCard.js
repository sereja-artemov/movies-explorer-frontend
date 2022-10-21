import React, {useState} from "react";
import {toHoursAndMinutes} from "../../../utils/timeConverter";

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
  isSavedTemplate,
  onDelete,
  onSaveMovie,
  isMovieSaved,
  savedMovie,
  getIdAndRemoveSavedMovie,
  _id,
  card
}) => {

  const [isSaved, setIsSaved] = useState(isMovieSaved);
  const cardSaveButtonClassName = `movies-card__save ${
    isSaved ? "movies-card__save--saved" : ""
  }`;

  function handleDelete() {
    onDelete(savedMovie);
  }

  function handleSave() {
    if (isSaved === false) {
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
    } else {
      getIdAndRemoveSavedMovie(movieId)
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
          onClick={handleSave}
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
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
