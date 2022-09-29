import React from 'react';
import {Link} from "react-router-dom";

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <Link to="" className="portfolio__link">Статичный сайт</Link>
                    <svg className="portfolio__arrow-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.56392 10.7145L0.566762 9.71733L7.98153 2.28977H2.25426L2.26705 0.909091H10.3594V9.0142H8.96591L8.97869 3.28693L1.56392 10.7145Z" fill="white"/>
                    </svg>
                </li>
                <li className="portfolio__list-item">
                    <Link to="" className="portfolio__link">Адаптивный сайт</Link>
                    <svg className="portfolio__arrow-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.56392 10.7145L0.566762 9.71733L7.98153 2.28977H2.25426L2.26705 0.909091H10.3594V9.0142H8.96591L8.97869 3.28693L1.56392 10.7145Z" fill="white"/>
                    </svg>
                </li>
                <li className="portfolio__list-item">
                    <Link to="" className="portfolio__link">Одностраничное приложение</Link>
                    <svg className="portfolio__arrow-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.56392 10.7145L0.566762 9.71733L7.98153 2.28977H2.25426L2.26705 0.909091H10.3594V9.0142H8.96591L8.97869 3.28693L1.56392 10.7145Z" fill="white"/>
                    </svg>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;
