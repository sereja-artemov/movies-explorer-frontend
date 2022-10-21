import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MOVIES_SERVER_URL } from "../../../utils/constants";

const MoviesCardList = ({
  cards,
  onSaveMovie,
  savedMoviesData,
  onRemoveSavedMovie,
  isLoading,
  isSavedTemplate,
  getIdAndRemoveSavedMovie
}) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [cardsAmount, setCardsAmount] = useState(5);
  const [moreCardsAmount, setMoreCardsAmount] = useState(0);

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
      {/*рендер сохраненных карточек из DB*/}
      {isSavedTemplate && (
        <ul className="movies__list">
          {isLoading && cards.length === 0 && <Preloader />}
          {!isLoading && cards.length === 0 && <p>Ничего не найдено</p>}

          {cards.slice(0, cardsAmount).map((savedMovie) => (
            <MoviesCard
              key={savedMovie._id}
              {...savedMovie}
              savedMovie={savedMovie}
              isSavedTemplate={isSavedTemplate}
              onDelete={onRemoveSavedMovie}
              _id={savedMovie._id}
            />
          ))}
        </ul>
      )}
      {/*рендер всех карточек*/}
      {!isSavedTemplate && (
        <ul className="movies__list">
          {isLoading && cards.length === 0 && <Preloader />}

          {cards.slice(0, cardsAmount).map((card) => (
            <MoviesCard
              key={card.id}
              {...card}
              card={card}
              image={MOVIES_SERVER_URL + card.image.url}
              thumbnail={MOVIES_SERVER_URL + card.image.formats.thumbnail.url}
              movieId={card.id}
              isSavedTemplate={isSavedTemplate}
              onSaveMovie={onSaveMovie}
              getIdAndRemoveSavedMovie={getIdAndRemoveSavedMovie}
              isMovieSaved={savedMoviesData.some(
                (movie) => movie.movieId === card.id
              )}
            />
          ))}
        </ul>
      )}
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
