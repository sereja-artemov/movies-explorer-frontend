import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MOVIES_SERVER_URL } from "../../../utils/constants";

const MoviesCardList = ({
  handleSaveMovie,
  savedMovies,
  setSavedMovies,
  filteredMovies,
  isLoading,
  isSavePageTemplate,
  handleDeleteMovie,
  handleRemoveSavedMovie,
  isFirstSearch
}) => {

  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [cardsAmount, setCardsAmount] = useState(5);
  const [moreCardsAmount, setMoreCardsAmount] = useState(0);

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

  useEffect(() => {
    checkCardsAmount();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowInnerWidth]);

  function handleResize() {
    setWindowInnerWidth(window.innerWidth);
  }

  function handleLoadMoreCards() {
    checkCardsAmount();
    setCardsAmount(cardsAmount + moreCardsAmount);
  }

  return (
    <>
      {/* Все фильмы */}
      {isSavePageTemplate === false && (
        <ul className="movies__list">
          {isLoading && <Preloader />}
          {!isLoading && filteredMovies.length === 0 && !isFirstSearch && (
            <p>Ничего не найдено</p>
          )}
          {filteredMovies.slice(0, cardsAmount).map((movie) => {
            return (
              <MoviesCard
                {...movie}
                movie={movie}
                key={movie.id}
                movieId={movie.id}
                imgLink={MOVIES_SERVER_URL + movie.image.url}
                imgAlt={movie.nameRU}
                duration={movie.duration}
                isSaved={savedMovies.some((i) => i.movieId === movie.id)}
                isSavePageTemplate={isSavePageTemplate}
                setSavedMovies={setSavedMovies}
                handleSaveMovie={handleSaveMovie}
                handleRemoveSavedMovie={handleRemoveSavedMovie}
              />
            );
          })}
        </ul>
      )}
      {isSavePageTemplate === false && filteredMovies.length > cardsAmount && (
        <button
          onClick={handleLoadMoreCards}
          type="button"
          className="movies__btn btn--stroke"
        >
          Еще
        </button>
      )}

      {/* Сохраненные фильмы */}
      {isSavePageTemplate === true && (
        <ul className="movies__list">
          {isLoading && <Preloader />}
          {!isLoading && filteredMovies.length === 0 && <p>Ничего не найдено</p>}
          {filteredMovies.map((movie) => {
            return (
              <MoviesCard
                {...movie}
                movie={movie}
                key={movie.movieId}
                imgLink={movie.image}
                isSavePageTemplate={isSavePageTemplate}
                imgAlt={movie.nameRU}
                trailerLink={movie.trailerLink}
                handleDeleteMovie={handleDeleteMovie}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MoviesCardList;
