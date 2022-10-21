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
import {getMoviesData} from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import  * as moviesApi from "../../utils/MoviesApi";
import {CurrentUserContext} from "../contexts/currentUserContext";

function App() {

  const [userData, setUserData] = useState({});
  const [moviesData, setMoviesData] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    if (localStorage.getItem('moviesBox')) {
      setMoviesData(JSON.parse(localStorage.getItem('moviesBox')));
    } else getMoviesData()
      .then((moviesData) => {
        localStorage.setItem('moviesBox', JSON.stringify(moviesData));
        setMoviesData(moviesData);
      })
      .catch(err => err)

  }, [isLoggedIn]);

  function onRegister({ name, email, password }) {
    setIsLoading(true)
    moviesApi.createUser(name, email, password)
      .then(() => {
        navigate('/signin')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function onLogin({email, password}) {
    setIsLoading(true)
    moviesApi.auth(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData({});
    setSavedMoviesData([]);
  }

  //сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn) {
      moviesApi.getSavedMovies()
        .then((res) => {
          const result = res.filter((m) => m.owner === userData._id)
          localStorage.setItem("savedMoviesData", JSON.stringify(result));
          setSavedMoviesData(result);
        })
        .catch(err => err)
    }
  }, [isLoggedIn])

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      moviesApi.getCurrentUser()
        .then((userData) => {
          setIsLoggedIn(true);
          setUserData(userData);
          navigate(location);
        })
        .catch((err) => err);
    }
  }

  function handleUpdateUser({name, email}) {
    moviesApi.updateUser(name, email)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(err)
        setProfileError('Ой, что-то пошло не так')
      });
  }

  function searchMoviesByQuery(movies, query) {
    const term = query.toLowerCase();

    const filteredArr = movies.filter(movie => {
     return movie.nameRU.toLowerCase().includes(term.toLowerCase());
    });
    return filteredArr;
  }

  function filterMoviesByDuration(movies, isShort) {
    const filteredArr = isShort
      ? movies.filter(card => card.duration <= 40)
      : movies;
    return filteredArr;
  }

  function handleSaveMovie(movie) {
    moviesApi.createMovie(movie)
      .then((res) => {
        setSavedMoviesData([...savedMoviesData, res]);
      })
      .catch(err => err)
  }

  function handleRemoveSavedMovie(cardId) {
    moviesApi.removeMovie(cardId._id)
      .then(() => {
        const cardIndex = savedMoviesData.findIndex(card => card._id === cardId._id);
        let newSavedMovies = [...savedMoviesData];
        newSavedMovies.splice(cardIndex, 1);
        setSavedMoviesData(newSavedMovies);
      })
      .catch(err => err)
  }

  function getIdAndRemoveSavedMovie(movieId) {
    if (savedMoviesData.length > 0) {
      let cardId = savedMoviesData.find(card => card.movieId === movieId);
      handleRemoveSavedMovie(cardId);
    }
  }

  return (
    <>
      {(location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile") && <Header isLoggedIn={isLoggedIn} />}
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
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                getIdAndRemoveSavedMovie={getIdAndRemoveSavedMovie}
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
                profileError={profileError}
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
      {(location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies") && <Footer />}
    </>
  );
}

export default App;
