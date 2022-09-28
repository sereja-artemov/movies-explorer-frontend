import React from 'react';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";

const Main = () => {
    return (
        <main className="main-content container">
            <Promo/>
            <AboutProject />
        </main>
    );
}

export default Main;
