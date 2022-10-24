import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { getMoviesData } from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../contexts/currentUserContext";
import {
  auth,
  createMovie,
  createUser,
  getCurrentUser,
  getSavedMovies, removeMovie, updateUser,
} from "../../utils/MoviesApi";
import { SHORT_FILTER_MINUTES_DURATION } from "../../utils/constants";
import Popup from "../Popup/Popup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import successImage from "../../images/tooltip/success.svg";
import failImage from "../../images/tooltip/cross.svg";

function App() {
  const [moviesData, setMoviesData] = useState([]); //первоначальные фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); //массив отфильтрованных фильмов

  const [userData, setUserData] = useState({}); //данные текущего пользователя

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [isShort, setIsShort] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  const [profileError, setProfileError] = useState('');

  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipImage, setTooltipImage] = useState(undefined);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const location = useLocation();


  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      navigate("/movies");
      getInitialMovies();
      getSavedMovies()
        .then((res) => {
          const result = res.filter((m) => m.owner === userData._id);
          setSavedMovies(result);
        })
        .catch((err) => err);
    }
  }, [isLoggedIn]);

  function getInitialMovies() {
    setIsLoading(true);
    if (localStorage.getItem("moviesData")) {
      const movies = JSON.parse(localStorage.getItem("moviesData"));
      setMoviesData(movies);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      getMoviesData()
        .then((data) => {
          setMoviesData(data);
          localStorage.setItem("moviesData", JSON.stringify(data));
          setIsLoading(false);
        })
        .catch((err) => err);
    }
  }

  function onRegister({ name, email, password }) {
    setIsLoading(true);
    moviesApi
      .createUser(name, email, password)
      .then(() => {
        openTooltip(successImage, 'Вы успешно зарегистрировались!');
        onLogin({ email, password });
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          openTooltip(failImage, 'Такой email уже существует');
        } else {
          openTooltip(failImage, 'Что-то пошло не так! Попробуйте ещё раз.');
        }
      })
      .finally(() => setIsLoading(false));
  }

  function onLogin({ email, password }) {
    setIsLoading(true);
    moviesApi
      .auth(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          openTooltip(failImage, 'Неправильные почта или пароль');
        } else {
          openTooltip(failImage, 'Что-то пошло не так! Попробуйте ещё раз.');
        }
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("moviesSearchResults");
    setIsLoggedIn(false);
    setUserData({});
    setSavedMovies([]);
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser()
        .then((userData) => {
          setIsLoggedIn(true);
          setUserData(userData);
          navigate(location);
        })
        .catch((err) => err);
    }
  }

  function handleUpdateUser({ name, email }) {
    updateUser(name, email)
      .then((res) => {
        setUserData(res);
        console.log(res)
        openTooltip(successImage, `Теперь вас зовут: ${res.name}, а ваша почта ${res.email}`);
      })
      .catch((err) => {
        console.log(err)
        setProfileError('Ой, что-то пошло не так')
      });
  }

  // поиск и фильтры
  function filterMoviesByDuration(moviesArr) {
    return moviesArr.filter((i) => i.duration < SHORT_FILTER_MINUTES_DURATION);
  }

  function searchMovies(moviesArr, searchQuery, isShortMovie, renderAll) {
    const filteredMovies = moviesArr.filter((i) => {
      return i.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
    });


    if (!renderAll) {
      if (isShortMovie && searchQuery !== "") {
        return filterMoviesByDuration(filteredMovies);
      }

      return searchQuery !== "" ? filteredMovies : [];
    } else {
      if (isShortMovie) {
        return filterMoviesByDuration(filteredMovies);
      }
      return filteredMovies
    }

  }

  //сохранить фильм
  function handleSaveMovie(movie) {
    createMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [
          ...savedMovies,
          { ...res, id: res.movieId },
        ];
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  //удалить фильм из библиотеки
  function handleDeleteMovie(movie) {
    removeMovie(movie._id)
      .then((res) => {
        const deletedCardIndex = savedMovies.findIndex(m => m._id === movie._id);
        let newSavedMovies = [...savedMovies];
        newSavedMovies.splice(deletedCardIndex, 1);
        setSavedMovies(newSavedMovies);
      })
      .catch(err => console.log(err))
  }

  function handleRemoveSavedMovie(movieId) {
    if (savedMovies.length > 0) {
      let movie = savedMovies.find(m => m.movieId === movieId);
      handleDeleteMovie(movie);
    }
  }

  function openTooltip(image, text) {
    setTooltipText(text);
    setTooltipImage(image)
    setIsTooltipActive(true);
  }

  function closeAllPopups() {
    setIsTooltipActive(false);
  }
  const isOpen = isTooltipActive;

  useEffect(() => {
    const closeByEscape = (evt) => {
      (evt.key === 'Escape') && closeAllPopups();
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <div>
      {(pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile") && <Header isLoggedIn={isLoggedIn} />}
      <CurrentUserContext.Provider value={userData}>
        <Routes>
          <Route
            path="/"
            element={

                <Main />

            }
          ></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  moviesData={moviesData}
                  savedMovies={savedMovies}
                  searchMovies={searchMovies}
                  filteredMovies={filteredMovies}
                  setFilteredMovies={setFilteredMovies}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setSavedMovies={setSavedMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleRemoveSavedMovie={handleRemoveSavedMovie}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  savedMovies={savedMovies}
                  searchMovies={searchMovies}
                  setFilteredMovies={setFilteredMovies}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  filteredMovies={filteredMovies}
                  handleDeleteMovie={handleDeleteMovie}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile userData={userData} handleLogout={handleLogout} handleUpdateUser={handleUpdateUser} profileError={profileError} />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/signin" element={<Login onLogin={onLogin} />}></Route>
          <Route
            path="/signup"
            element={<Register onRegister={onRegister} />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </CurrentUserContext.Provider>
      {(pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies") && <Footer />}

      <InfoTooltip
        isOpen={isTooltipActive}
        onClose={closeAllPopups}
        isLoading={isLoading}
        text={tooltipText}
        image={tooltipImage}
      />

    </div>
  );
}

export default App;
