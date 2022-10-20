import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

const Header = ({ isLoggedIn }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuBtnClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img
          src={logo}
          alt="movies explorer frontend логотип"
          className="header__logo-img"
        />
      </Link>

      {isLoggedIn && <Navigation isOpen={isNavOpen} />}
      {!isLoggedIn && (
        <div className="header__auth">
          <Link to="/signup" className="header__auth-signup">
            Регистрация
          </Link>
          <Link to="/signin" className="header__auth-signin btn">
            Войти
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <button
          type="button"
          onClick={handleMenuBtnClick}
          className={`header__menu-btn ${
            isNavOpen && `header__menu-btn--opened`
          }`}
        ></button>
      )}
    </header>
  );
};

export default Header;
