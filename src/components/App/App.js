import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={ <Main /> }></Route>
        <Route path="/movies" element={ <Movies /> }></Route>
        <Route path="/saved-movies">

        </Route>
        <Route path="/profile">

        </Route>
        <Route path="/signin">

        </Route>
        <Route path="/signup">

        </Route>
      </Routes>
    </div>
  );
}

export default App;
