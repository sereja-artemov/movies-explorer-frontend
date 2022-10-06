import React, {useState} from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true); //временно для теста

    const handleMenuBtnClick = () => {
        isNavOpen ? setIsNavOpen(false) : setIsNavOpen(true);
    }

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <img src={logo} alt="movies explorer frontend логотип" className="header__logo-img"/>
            </Link>

            { isLogin &&
                <Navigation isOpen={isNavOpen} />
            }
            { !isLogin &&
                <div className="header__auth">
                    <Link to="/signup" className="header__auth-signup">Регистрация</Link>
                    <Link to="/signin" className="header__auth-signin btn">Войти</Link>
                </div>
            }

            { isLogin &&
                <button onClick={handleMenuBtnClick} className={`header__menu-btn ${isNavOpen && `header__menu-btn--opened`}`}></button>
            }
        </header>
    );
};

export default Header;
