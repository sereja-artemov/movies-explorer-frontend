import React, {useEffect, useState} from "react";
import {Routes, Route, useLocation, Navigate, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { getMovies } from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import  * as moviesApi from "../../utils/MoviesApi";
import {CurrentUserContext} from "../contexts/currentUserContext";
import {createUser, getSavedMovies} from "../../utils/MoviesApi";
import {SHORT_FILTER_MINUTES_DURATION} from "../../utils/constants";

function App() {

  const [moviesData, setMoviesData] = useState([]); //первоначальные фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); //массив отфильтрованных фильмов

  const [userData, setUserData] = useState({}); //данные текущего пользователя

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((data) => {
        setMoviesData(data);
        setIsLoading(false);
      })
      .catch((err) => err);

    getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => err);
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      navigate('/movies');
      moviesApi.getCurrentUser()
        .then((userData) => {
          setUserData(userData);
        })
        .catch((err) => err);
    }
  }, [isLoggedIn]);

  function onRegister({ name, email, password }) {
    setIsLoading(true)
    moviesApi.createUser(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }

  function onLogin({email, password}) {
    setIsLoading(true)
    moviesApi.auth(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        checkToken();
      })
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData({});
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
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


  // //сохранить фильм
  // function handleSaveMovie(movie) {
  //   mainApi
  //     .saveMovie(movie)
  //     .then((res) => {
  //       const updatedSavedMovies = [...savedMovies, { ...res, id: res.movieId }];
  //       setSavedMovies(updatedSavedMovies);
  //       localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
  //     })
  //     .catch(err => console.log(err));
  // };
  //
  // //удалить фильм из библиотеки
  // function handleDeleteMovie(movie) {
  //   mainApi
  //     .deleteMovie(movie._id)
  //     .then(() => {
  //       const updatedSavedMovies = savedMovies.filter(m => m._id !== movie._id)
  //       setSavedMovies(updatedSavedMovies);
  //       localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
  //     })
  //     .catch(err => console.log(err))
  // };

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
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies />
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
