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
import {getMovies} from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as userAuth from "../../utils/userAuth";

function App() {

  const { pathname } = useLocation();
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((data) => {
        setMoviesData(data);
        setIsLoading(false);
      })
      .catch(err => err);
  }, [])

  function onRegister({ name, email, password }) {
    debugger
    setIsLoading(true)
    userAuth.register(name, email, password)
      .then(() => {
        navigate.push('/signin')
      })
      .catch(err => err)
      .finally(() => setIsLoading(false));
  }

  return (
    <div>
      {(pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile") && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Main />
          </ProtectedRoute>
        }></Route>
        <Route path="/movies" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Movies moviesData={moviesData} isLoading={isLoading} />
          </ProtectedRoute>
        }></Route>
        <Route path="/saved-movies" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <SavedMovies />
          </ProtectedRoute>
        }></Route>
        <Route path="/profile" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </ProtectedRoute>
        }></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/signup" element={<Register onRegister={onRegister} />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {(pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies") && <Footer />}
    </div>
  );
}

export default App;
