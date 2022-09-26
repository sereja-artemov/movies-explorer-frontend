import React from 'react';
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header container">
            <Link to="/" className="header__logo">
                <img src="#" alt="movies explorer frontend логотип" className="header__logo-img"/>
            </Link>
            <div className="header__auth">
                <Link to="/signup" className="header__auth-signup">Регистрация</Link>
                <Link to="/signin" className="header__auth-signin">Войти</Link>
            </div>
            <nav className="main-nav">
                <button className="main-nav__menu-btn"></button>
                <ul className="main-nav__list">
                    <li className="main-nav__list-item"><NavLink to="/" className="main-nav__link">Главная</NavLink></li>
                    <li className="main-nav__list-item"><NavLink to="/movies" className="main-nav__link">Фильмы</NavLink></li>
                    <li className="main-nav__list-item"><NavLink to="/saved-movies" className="main-nav__link">Сохраненные фильмы</NavLink></li>
                </ul>
                <Link to="/profile" className="main-nav__profile-link">Аккаунт</Link>
            </nav>
        </header>
    );
};

export default Header;
