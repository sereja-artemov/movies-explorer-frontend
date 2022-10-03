import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <section className="not-found container">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link to="/" className="not-found__back">Назад</Link>
        </section>
    );
};

export default NotFound;
