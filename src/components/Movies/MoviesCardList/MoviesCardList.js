import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MOVIES_SERVER_URL } from "../../../utils/constants";
import { toHoursAndMinutes } from "../../../utils/timeConverter";
import {useLocation} from "react-router-dom";
import {getSavedMovies} from "../../../utils/MoviesApi";

const MoviesCardList = ({ cards, onSaveMovie, savedMoviesData, onRemoveSavedMovie, isLoading }) => {

  const { pathname } = useLocation();
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [cardsAmount, setCardsAmount] = useState(5);
  const [moreCardsAmount, setMoreCardsAmount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkCardsAmount();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowInnerWidth]);


  function handleResize() {
    setWindowInnerWidth(window.innerWidth);
  }

  function handleLoadMoreCards() {
    checkCardsAmount();
    setCardsAmount(cardsAmount + moreCardsAmount);
  }

  const checkCardsAmount = () => {
    if (windowInnerWidth >= 1920) {
      setCardsAmount(15);
      setMoreCardsAmount(5);
    } else if (windowInnerWidth >= 1280) {
      setCardsAmount(12);
      setMoreCardsAmount(3);
    } else if (windowInnerWidth >= 481) {
      setCardsAmount(8);
      setMoreCardsAmount(2);
    } else if (windowInnerWidth <= 480) {
      setCardsAmount(5);
      setMoreCardsAmount(1);
    }
  };

  console.log(cardsAmount, moreCardsAmount);

  return (
    <>
      {/* НАЧАЛО На страницу фильмов*/}
      { pathname === '/movies' &&
        <ul className="movies__list">
        {(isLoading && cards.length === 0) && <Preloader />}
        {!isLoading && cards.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          cards.slice(0, cardsAmount).map((movie, index) => {
            //тут делаем проверку. Если id карточки совпадает с movieId сохраненной карточки, то устанавливаем isSaved = true
              if (movie.id) {
                console.log(`${index} ${movie.id}`)
              }
            return (
              <MoviesCard
                id={movie.id}
                key={movie.id}
                imgLink={MOVIES_SERVER_URL + movie.image.url}
                trailerLink={movie.trailerLink}
                imgAlt={movie.nameRU}
                name={movie.nameRU}
                duration={toHoursAndMinutes(movie.duration)}

                isSaved={isSaved}
                setIsSaved={setIsSaved}
                movie={movie}
              />
            );
          })
        )}
      </ul>
      }
      { (pathname === '/movies' && cards.length > cardsAmount) &&
        <button
          onClick={handleLoadMoreCards}
          type="button"
          className="movies__btn btn--stroke"
        >
          Еще
        </button>
      }
      {/* КОНЕЦ На страницу фильмов*/}

      {/* НАЧАЛО На страницу сохраненных фильмов*/}
      { pathname === '/saved-movies' &&
        <ul className="movies__list">

          {(isLoading && cards.length === 0) && <Preloader />}
          {!isLoading && cards.length === 0 ? (
            <p>Ничего не найдено</p>
          ) : (
            cards.slice(0, cardsAmount).map((movie) => {
              return (
                <MoviesCard
                  id={movie.movieId}
                  key={movie.movieId}
                  imgLink={movie.image}
                  trailerLink={movie.trailerLink}
                  imgAlt={movie.nameRU}
                  name={movie.nameRU}
                  duration={toHoursAndMinutes(movie.duration)}

                  isSaved={isSaved}
                  setIsSaved={setIsSaved}
                />
              );
            })
          )}
        </ul>
      }
      {/* КОНЕЦ На страницу сохраненных фильмов*/}
    </>
  );
};

export default MoviesCardList;
