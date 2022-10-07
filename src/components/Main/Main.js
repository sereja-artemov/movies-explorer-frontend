import React from 'react';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const Main = () => {
    return (
        <main className="main-content">
            <div className="container-fluid">
                <Promo />
            </div>
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;
