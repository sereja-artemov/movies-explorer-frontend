import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ isOpen }) => {
  let activeClassName = "navigation__link--active";
  return (
    <>
      <div className={`overlay ${isOpen && "overlay--active"} `}></div>
      <nav className={`navigation ${isOpen && "navigation--open"} `}>
        <ul className="navigation__list">
          <li className="navigation__list-item navigation__list-item--hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `navigation__link ${activeClassName}`
                  : "navigation__link"
              }
            end >
              Главная
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? `navigation__link ${activeClassName}`
                  : "navigation__link"
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? `navigation__link ${activeClassName}`
                  : "navigation__link"
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="navigation__account-link">
          Аккаунт
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
