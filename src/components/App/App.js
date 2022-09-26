import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Header from "../Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/">

        </Route>
        <Route path="/movies">

        </Route>
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
