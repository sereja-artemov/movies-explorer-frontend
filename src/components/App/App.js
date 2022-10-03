import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={ <Main /> }></Route>
        <Route path="/movies" element={ <Movies /> }></Route>
        <Route path="/saved-movies" element={ <Movies /> } ></Route>
        <Route path="/profile" element={ <Profile /> } ></Route>
        <Route path="/signin">

        </Route>
        <Route path="/signup">

        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
