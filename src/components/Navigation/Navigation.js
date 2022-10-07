import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = ({ isOpen }) => {
    return (
        <>
        <div className={`overlay ${isOpen && "overlay--active"} `}></div>
            <nav className={`navigation ${isOpen && "navigation--open"} `}>
                <ul className="navigation__list">
                    <li className="navigation__list-item">
                        <NavLink activeClassName="navigation__link--active" to="/" className="navigation__link" >Главная</NavLink>
                    </li>
                    <li className="navigation__list-item">
                        <NavLink activeClassName="navigation__link--active" to="/movies" className="navigation__link" >Фильмы</NavLink>
                    </li>
                    <li className="navigation__list-item">
                        <NavLink activeClassName="navigation__link--active" to="/saved-movies" className="navigation__link" >Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <NavLink to="/profile" className="navigation__account-link">Аккаунт</NavLink>
            </nav>
        </>
    );
};

export default Navigation;
