import React from 'react';
import { Link } from "react-router-dom";
import logoImg from '../../images/logo.svg';

const Form = ({ formId, formTitle, children, textButton="Отправить", textBottom="", textLinkBottom="" }) => {
    return (
        <form id={formId} className="form">
            <Link to="/" className="form__logo">
                <img src={logoImg} alt="логотип movies-explorer" className="form__logo-img"/>
            </Link>
            <h3 className="form__title">{formTitle}</h3>
            <fieldset className="form__fields">
                { children }
            </fieldset>

            <div className="form__bottom-block">
                <input type="submit" className="form__submit btn" value={textButton} />
                <p className="form__bottom-text">{textBottom} <Link to="/" className="form__bottom-link">{textLinkBottom}</Link> </p>
            </div>

        </form>
    );
};

export default Form;