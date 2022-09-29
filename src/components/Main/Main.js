import React from 'react';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";

const Main = () => {
    return (
        <main className="main-content container">
            <Promo/>
            <AboutProject />
            <Techs />
        </main>
    );
}

export default Main;
