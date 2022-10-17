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
import {createUser, getSavedMovies} from "../../utils/MoviesApi";

function App() {

  const [userData, setUserData] = useState({});
  const [moviesData, setMoviesData] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const { pathname } = useLocation();

  useEffect(() => {
    getMovies();
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

  return (
    <CurrentUserContext.Provider value={userData}>
        <Routes>
              <Route path="/" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main />
                </ProtectedRoute>
              }></Route>
              <Route path="/movies" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies />
                </ProtectedRoute>
              }></Route>
              <Route path="/saved-movies" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies />
                </ProtectedRoute>
              }></Route>
              <Route path="/profile" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile onLogout={handleLogout} />
                </ProtectedRoute>
              }></Route>

          <Route path="/signin" element={<Login onLogin={onLogin}/>}></Route>
          <Route path="/signup" element={<Register onRegister={onRegister} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </CurrentUserContext.Provider>

  );
}

export default App;
