import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import {createMovie, getSavedMovies} from "../../../utils/MoviesApi";
import {MOVIES_SERVER_URL} from "../../../utils/constants";
import {toHoursAndMinutes} from "../../../utils/timeConverter";

const MoviesCard = ({
  id,
  imgLink,
                      nameRU,
  duration,
  imgAlt,
  trailerLink,
  filteredArray,
  savedMoviesArr,
  setSavedMoviesArr,
  isSaved,
  setIsSaved,
  movie
}) => {

  const { pathname } = useLocation();
  const cardSaveButtonClassName = `movies-card__save ${isSaved ? "movies-card__save--saved" : ""}`;

  function handleSaveButton(event) {
    const {
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
    } = movie;
    //тут делаем запрос к api для сохранения фильмов
    createMovie({
      country,
      director,
      duration: duration,
      year,
      description,
      image: MOVIES_SERVER_URL + image.url,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: MOVIES_SERVER_URL + image.url,
      movieId,
    })
      .then((savedMovie) => {
        console.log(savedMovie);
      })
      .catch((err) => err);
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
        <span className="movies-card__duration">{duration}</span>
      </div>
      {pathname === "/movies" && (
        <button
          onClick={handleSaveButton}
          movieid={id}
          type="button"
          className={cardSaveButtonClassName}
        >
          <span className="movies-card__save-text">Сохранить</span>
        </button>
      )}
      {/*Показываем кнопку удаления только, если элемент сохранен и только на странице сохраненок*/}
      {(pathname === "/saved-movies") && (
        <button className="movies-card__delete"></button>
      )}
    </li>
  );
};

export default MoviesCard;
