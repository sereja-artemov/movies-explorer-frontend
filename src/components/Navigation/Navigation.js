import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = ({ isOpen }) => {
    return (
        <>
        <div className={`overlay ${isOpen && "overlay--active"} `}></div>
            <nav className={`navigation ${isOpen && "navigation--open"} `}>
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
                <NavLink to="/profile" className="navigation__account-link">Аккаунт</NavLink>
            </nav>
        </>
    );
};

export default Navigation;
