import React from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';

const Header = () => {
    return (
        <header className="header container">
            <Link to="/" className="header__logo">
                <img src={logo} alt="movies explorer frontend логотип" className="header__logo-img"/>
            </Link>
            <div className="header__auth">
                <Link to="/signup" className="header__auth-signup">Регистрация</Link>
                <Link to="/signin" className="header__auth-signin btn">Войти</Link>
            </div>
                <button className="header__menu-btn"></button>
            <nav className="main-nav">
                <ul className="main-nav__list">
                    <li className="main-nav__list-item"><NavLink to="/" className="main-nav__link" activeClassName="main-nav__link--active">Главная</NavLink></li>
                    <li className="main-nav__list-item"><NavLink to="/movies" className="main-nav__link" activeClassName="main-nav__link--active">Фильмы</NavLink></li>
                    <li className="main-nav__list-item"><NavLink to="/saved-movies" className="main-nav__link" activeClassName="main-nav__link--active">Сохраненные фильмы</NavLink></li>
                </ul>
                <div className="main-nav__profile-wrapper">
                    <Link to="/profile" className="main-nav__profile-link">Аккаунт</Link>
                    <span className="main-nav__profile-icon"></span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
