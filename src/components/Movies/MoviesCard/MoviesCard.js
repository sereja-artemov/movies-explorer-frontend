import React from "react";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ imgLink, name, duration, imgAlt, isSaved }) => {

  const { pathname } = useLocation();

  return (
    <li className="movies-card">
        <img src={imgLink} alt={imgAlt} className="movies-card__image" />
      <div className="movies-card__description">
        <h2 className="movies-card__name">{name}</h2>
        <span className="movies-card__duration">{duration}</span>
      </div>
      { pathname === "/movies" &&
        <button type="button" className={`movies-card__save ${isSaved}`}>
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
