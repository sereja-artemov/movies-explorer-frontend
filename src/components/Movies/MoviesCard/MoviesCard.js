import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import {createMovie, getSavedMovies} from "../../../utils/MoviesApi";
import {MOVIES_SERVER_URL} from "../../../utils/constants";
import {toHoursAndMinutes} from "../../../utils/timeConverter";

const MoviesCard = ({ id, imgLink, name, duration, imgAlt, isSaved, setIsSaved, trailerLink, filteredArray }) => {

  const { pathname } = useLocation();
  const [savedMoviesArr, setSavedMoviesArr] = useState([]);

  useEffect(() => {
    getSavedMovies()
      .then((movies) => {
        setSavedMoviesArr(movies);
      })
      .catch(err => err)
  }, [])

  function handleSaveButton(event) {
    console.log('Отправляем запрос на сохранение фильма');
    const currentTarget = event.currentTarget.attributes.movieid.value;
    const movieToSave = filteredArray.find(movie => {
      return movie.id === Number(currentTarget)
    });

    //тут делаем запрос к api для сохранения фильмов
    createMovie({
      imgLink: MOVIES_SERVER_URL + movieToSave.image.url,
      trailerLink: movieToSave.trailerLink,
      imgAlt: movieToSave.nameRU,
      name: movieToSave.nameRU,
      duration: movieToSave.duration,
      isSaved: true,
    })
      .then((res) => {
        console.log('Фильм сохранен');
      })
      .catch(err => err)
  }

  return (
    <li className="movies-card">
      <a rel="noreferrer noopener" href={trailerLink} target="_blank" className="movies-card__link">
          <img src={imgLink} alt={imgAlt} className="movies-card__image" />
      </a>
        <div className="movies-card__description">
          <h2 className="movies-card__name">{name}</h2>
          <span className="movies-card__duration">{duration}</span>
        </div>
        { pathname === "/movies" &&
          <button onClick={handleSaveButton} movieid={id} type="button" className={`movies-card__save ${isSaved && 'movies-card__save--saved'}`}>
            <span className="movies-card__save-text">Сохранить</span>
          </button>
        }
        {/*Показываем кнопку удаления только, если элемент сохранен и только на странице сохраненок*/}
        { (pathname === "/saved-movies" && isSaved) && (
          <button className="movies-card__delete"></button>
        ) }
    </li>
  );
};

export default MoviesCard;
