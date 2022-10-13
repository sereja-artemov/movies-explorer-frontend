import React, {useEffect, useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

function App() {

  const { pathname } = useLocation();
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((data) => {
        setMoviesData(data);
        setIsLoading(false);
      })
      .catch(err => err);
  }, [])

  return (
    <div>
      {(pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile") && <Header />}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/movies" element={<Movies moviesData={moviesData} isLoading={isLoading} />}></Route>
        <Route path="/saved-movies" element={<SavedMovies />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {(pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies") && <Footer />}
    </div>
  );
}

export default App;
