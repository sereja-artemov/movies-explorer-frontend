import React, {useEffect, useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MOVIES_SERVER_URL } from "../../../utils/constants";
import { toHoursAndMinutes } from "../../../utils/timeConverter";

const MoviesCardList = ({moviesData, windowInnerWidth}) => {

  const [movieCards, setMovieCards] = useState([]);
  const [cardsAmount, setCardsAmount] = useState(5);
  const [moreCardsAmount, setMoreCardsAmount] = useState(1);

  useEffect(() => {
    setMovieCards(moviesData);
    checkCardsAmount();
  })

  const checkCardsAmount = () => {
   if (windowInnerWidth >= 1280) {
     setCardsAmount(12)
     setMoreCardsAmount(3)
   } else if (windowInnerWidth >= 481) {
     setCardsAmount(8)
     setMoreCardsAmount(2)
   } else if (windowInnerWidth <= 480) {
     setCardsAmount(5)
     setMoreCardsAmount(1)
   }
  }

  const handleLoadMoreCards = () => {

  }

  console.log(cardsAmount, moreCardsAmount)

  return (
    <>
      <ul className="movies__list">

        { movieCards.length === 0 ? <Preloader /> :
          movieCards.slice(0, cardsAmount).map((movie) => {
            return <MoviesCard
              key={movie.id}
              imgLink={MOVIES_SERVER_URL + movie.image.url}
              trailerLink={movie.trailerLink}
              imgAlt={movie.nameRU}
              name={movie.nameRU}
              duration={toHoursAndMinutes(movie.duration)}
              isSaved="movies-card__save--saved"
            />
          })
        }

      </ul>
      <button onClick={handleLoadMoreCards} type="button" className="movies__btn btn--stroke">Еще</button>
    </>
  );
};

export default MoviesCardList;
