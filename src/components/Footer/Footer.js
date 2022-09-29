import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__content-wrapper">
                <ul className="footer__list">
                    <li className="footer__list-item"><Link to="" className="footer__link">Яндекс.Практикум</Link></li>
                    <li className="footer__list-item"><Link to="" className="footer__link">Github</Link></li>
                </ul>
                <span className="footer__copyright">©2022</span>
            </div>
        </footer>
    );
};

export default Footer;
