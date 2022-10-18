import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MOVIES_SERVER_URL } from "../../../utils/constants";
import { toHoursAndMinutes } from "../../../utils/timeConverter";
import {useLocation} from "react-router-dom";
import {getSavedMovies} from "../../../utils/MoviesApi";

const MoviesCardList = ({ cards, onSaveMovie, savedMoviesData, onRemoveSavedMovie, isLoading, isSavedTemplate }) => {

  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [cardsAmount, setCardsAmount] = useState(5);
  const [moreCardsAmount, setMoreCardsAmount] = useState(0);

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
  return (
    <>

      {!isSavedTemplate && (
        <ul className="movies__list">

          {isLoading && cards.length === 0 && <Preloader />}
          {!isLoading && cards.length === 0 && <p>Ничего не найдено</p>}

          {cards.map((card) => (
            <MoviesCard
              key={card.id}
              //удалил деструктуризацию {...card}
              card={card}
              isSavedTemplate={isSavedTemplate}
              onSaveMovie={onSaveMovie}
              onDelete={onRemoveSavedMovie}
              country={card.country}
              director={card.director}
              duration={card.duration}
              year={card.year}
              description={card.description}
              image={MOVIES_SERVER_URL + card.image.url}
              thumbnail={MOVIES_SERVER_URL + card.thumbnail}
              movieId={card.id}
              nameRU={card.nameRU}
              nameEN={card.nameEN}
              trailerLink={card.trailerLink}
            />
          ))}
        </ul>
      )}

      {isSavedTemplate && (
        <ul className="movies__list">

          {isLoading && cards.length === 0 && <Preloader />}

          {cards.map((card) => (
            <MoviesCard
              key={card._id}
              //удалил деструктуризацию {...card}
              card={card}
              isSavedTemplate={isSavedTemplate}
              onDelete={onRemoveSavedMovie}
              country={card.country}
              director={card.director}
              duration={card.duration}
              year={card.year}
              description={card.description}
              image={card.image}
              thumbnail={card.thumbnail}
              movieId={card.id}
              nameRU={card.nameRU}
              nameEN={card.nameEN}
              trailerLink={card.trailerLink}
            />
          ))}
        </ul>
      )

      }

      {cards.length > cardsAmount && (
        <button
          onClick={handleLoadMoreCards}
          type="button"
          className="movies__btn btn--stroke"
        >
          Еще
        </button>
      )}
    </>
  );
};

export default MoviesCardList;


// <MoviesCard
//   id={movie.movieId}
//   key={movie.movieId}
//   imgLink={movie.image}
//   trailerLink={movie.trailerLink}
//   imgAlt={movie.nameRU}
//   name={movie.nameRU}
//   duration={toHoursAndMinutes(movie.duration)}
//
//   isSaved={isSaved}
//   setIsSaved={setIsSaved}
// />
