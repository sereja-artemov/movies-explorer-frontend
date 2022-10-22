import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createMovie, getSavedMovies } from "../../../utils/MoviesApi";
import { MOVIES_SERVER_URL } from "../../../utils/constants";
import { toHoursAndMinutes } from "../../../utils/timeConverter";

const MoviesCard = ({
  id,
  imgLink,
  nameRU,
  duration,
  imgAlt,
  trailerLink,
  director,
  year,
  description,
  image,
  nameEN,
  movieId,
  country,
  isSaved,
  isSavePageTemplate,
  handleSaveMovie,
  handleDeleteMovie,
  movie
}) => {
  const cardSaveButtonClassName = `movies-card__save ${
    isSaved ? "movies-card__save--saved" : ""
  }`;
  console.log(movie)
  function handleSaveButton() {
    handleSaveMovie({
      country,
      director,
      duration,
      year,
      description,
      image: MOVIES_SERVER_URL + image.url,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: MOVIES_SERVER_URL + image.url,
      movieId,
    });
  }

  function handleDeleteButton() {
    handleDeleteMovie(movie);
  }

  return (
    <li className="movies-card">
      <a
        rel="noreferrer noopener"
        href={trailerLink}
        target="_blank"
        className="movies-card__link"
      >
        <img src={imgLink} alt={imgAlt} className="movies-card__image" />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__name">{nameRU}</h2>
        <span className="movies-card__duration">
          {toHoursAndMinutes(duration)}
        </span>
      </div>
      {!isSavePageTemplate && (
        <button
          onClick={handleSaveButton}
          movieid={id}
          type="button"
          className={cardSaveButtonClassName}
        >
          <span className="movies-card__save-text">Сохранить</span>
        </button>
      )}

      {isSavePageTemplate && <button onClick={handleDeleteButton} className="movies-card__delete"></button>}
    </li>
  );
};

export default MoviesCard;
