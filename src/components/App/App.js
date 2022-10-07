import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Navigation from "../Navigation/Navigation";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
    const { pathname } = useLocation();
  return (
    <div>
        { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && <Header /> }
      <Routes>
        <Route path="/" element={ <Main /> }></Route>
        <Route path="/movies" element={ <Movies /> }></Route>
        <Route path="/saved-movies" element={ <Movies /> } ></Route>
        <Route path="/profile" element={ <Profile /> } ></Route>
        <Route path="/signin" element={ <Login /> } ></Route>
        <Route path="/signup" element={ <Register /> } ></Route>
        <Route path="*" element={ <NotFound /> }></Route>
      </Routes>
        { (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer /> }
    </div>
  );
}

export default App;
