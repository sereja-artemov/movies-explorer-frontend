import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__list-item">
                    <NavLink to="/" className="navigation__link" activeClassName="navigation__link--active">Главная</NavLink>
                </li>
                <li className="navigation__list-item">
                    <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link--active">Фильмы</NavLink>
                </li>
                <li className="navigation__list-item">
                    <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link--active">Сохранённые фильмы</NavLink>
                </li>
            </ul>
            a
        </nav>
    );
};

export default Navigation;