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
  createMovie,
  createUser,
  getCurrentUser,
  getSavedMovies, removeMovie,
} from "../../utils/MoviesApi";
import { SHORT_FILTER_MINUTES_DURATION } from "../../utils/constants";

function App() {
  const [moviesData, setMoviesData] = useState([]); //первоначальные фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); //массив отфильтрованных фильмов

  const [userData, setUserData] = useState({}); //данные текущего пользователя

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   const fmlstrg = JSON.parse(localStorage.getItem('filteredMovies'));
  //   if (localStorage.getItem('filteredMovies') !== null) {
  //     setFilteredMovies(fmlstrg);
  //   }
  // }, [])

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getInitialMovies();
    getSavedMovies()
      .then((res) => {
        const result = res.filter((m) => m.owner === userData._id);
        localStorage.setItem("savedMoviesData", JSON.stringify(result));
        setSavedMovies(result);
      })
      .catch((err) => err);
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      navigate("/movies");
      moviesApi
        .getCurrentUser()
        .then((userData) => {
          setUserData(userData);
        })
        .catch((err) => err);
    }
  }, [isLoggedIn]);

  function getInitialMovies() {
    if (localStorage.getItem("moviesData")) {
      const movies = JSON.parse(localStorage.getItem("moviesData"));
      setMoviesData(movies);
      setIsLoading(false);
    } else {
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
        navigate("/signin");
      })
      .catch((err) => err)
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
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.removeItem("token");
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

  // поиск и фильтры
  function filterMoviesByDuration(moviesArr) {
    return moviesArr.filter((i) => i.duration < SHORT_FILTER_MINUTES_DURATION);
  }

  function searchMovies(moviesArr, searchQuery, isShortMovie) {
    const filteredMovies = moviesArr.filter((i) => {
      return i.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (isShortMovie && searchQuery !== "") {
      return filterMoviesByDuration(filteredMovies);
    }
    return searchQuery !== "" ? filteredMovies : [];
  }

  //сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies()
        .then((res) => {
          const result = res.filter((m) => m.owner === userData._id);
          localStorage.setItem("savedMoviesData", JSON.stringify(result));
          setSavedMovies(result);
        })
        .catch((err) => err);
    }
  }, [isLoggedIn]);

  //сохранить фильм
  function handleSaveMovie(movie) {
    createMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [
          ...savedMovies,
          { ...res, id: res.movieId },
        ];
        setSavedMovies(updatedSavedMovies);
        // localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => console.log(err));
  }

  //удалить фильм из библиотеки
  function handleDeleteMovie(movie) {
    removeMovie(movie)
      .then((res) => {
        const deletedCardIndex = savedMovies.findIndex(m => m._id === movie._id);
        let newSavedMovies = [...savedMovies];
        newSavedMovies.splice(deletedCardIndex, 1);
        setSavedMovies(newSavedMovies);
        // localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      })
      .catch(err => console.log(err))
  }

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
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main />
              </ProtectedRoute>
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
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                  isShort={isShort}
                  setIsShort={setIsShort}
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
                  searchQuery={searchQuery}
                  isShort={isShort}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setSearchQuery={setSearchQuery}
                  setIsShort={setIsShort}
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
                <Profile userData={userData} handleLogout={handleLogout} />
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
    </div>
  );
}

export default App;
