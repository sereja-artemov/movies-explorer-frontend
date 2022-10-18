import React, {useEffect, useState} from "react";
import {Routes, Route, useLocation, Navigate, useNavigate, useHistory} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import {getMoviesData} from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import  * as moviesApi from "../../utils/MoviesApi";
import {CurrentUserContext} from "../contexts/currentUserContext";

function App() {

  const [userData, setUserData] = useState({});
  const [moviesData, setMoviesData] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getMovies();
    moviesApi.getSavedMovies()
      .then((res) => {
        setSavedMoviesData(res);
        setIsLoading(false);
      })
      .catch(err => err)
  }, [])

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
        navigate.push('/signin')
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
    setSavedMoviesData([]);
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }

  function handleUpdateUser({name, email}) {
    moviesApi.updateUser(name, email)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => err);
  }

  function getMovies() {
    if (localStorage.getItem('moviesBox')) {
      setMoviesData(JSON.parse(localStorage.getItem('moviesBox')));
    } else getMoviesData()
      .then((moviesData) => {
        localStorage.setItem('moviesBox', JSON.stringify(moviesData));
        setMoviesData(moviesData);
      })
      .catch(err => err)
  }

  // function searchMoviesByQuery(movies, query) {
  //   const terms = query.toLowerCase().split(' ');
  //
  //   const filteredArr = movies.filter(movie => {
  //     const movieData = [
  //       movie.nameRU,
  //       // movie.nameEN,
  //     ].filter(Boolean).join(", ").toLowerCase();
  //
  //     return terms.every(term => {
  //       return movieData.includes(term);
  //     });
  //   });
  //   return filteredArr;
  // }

  function searchMoviesByQuery(movies, query) {
    const term = query.toLowerCase();

    const filteredArr = movies.filter(movie => {
      movie.includes(term)
    });
    return filteredArr;
  }

  function filterMoviesByDuration(movies, isShort) {
    const filteredArr = isShort
      ? movies.filter(card => card.duration <= 40)
      : movies.filter(card => card.duration > 40);
    return filteredArr;
  }

  function handleSaveMovie(movie) {
    moviesApi.createMovie(movie)
      .then((res) => {
        setSavedMoviesData([res, ...savedMoviesData]);
      })
      .catch(err => err)
  }

  function handleRemoveSavedMovie(cardId) {
    moviesApi.removeMovie(cardId)
      .then(() => {
        const cardIndex = savedMoviesData.findIndex(card => card._id === cardId);
        let newSavedMovies = [...savedMoviesData];
        newSavedMovies.splice(cardIndex, 1);
        setSavedMoviesData(newSavedMovies);
      })
      .catch(err => err)
  }

  function getIdAndRemoveSavedMovie(movieId) {
    if (savedMoviesData.length > 0) {
      let cardId = savedMoviesData.find(card => card.movieId === movieId)._id;
      handleRemoveSavedMovie(cardId);
    }
  }

  return (
    <>
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
                savedMoviesData={savedMoviesData}
                onSearch={searchMoviesByQuery}
                onFilter={filterMoviesByDuration}
                onSaveMovie={handleSaveMovie}
                onRemoveSavedMovie={getIdAndRemoveSavedMovie}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies
                savedMoviesData={savedMoviesData}
                onSearch={searchMoviesByQuery}
                onFilter={filterMoviesByDuration}
                onRemoveSavedMovie={handleRemoveSavedMovie}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                onLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
              />
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
    </>
  );
}

export default App;
