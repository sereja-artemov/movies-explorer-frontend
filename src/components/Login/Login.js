import React from 'react';
import Form from "../Form/Form";

const Login = () => {
    return (
        <section className="signup container">
            <Form formId="signup-form" formTitle="Рады видеть!" textBottom="Ещё не зарегистрированы?" textButton="Войти" textLinkBottom="Регистрация" children={
                <>
                    <label className="form__label">
                        E-mail
                        <input type="email" className="form__input" placeholder="E-mail" />
                        <span className="form__validation-error">Что-то пошло не так...</span>
                    </label>
                    <label className="form__label">
                        Пароль
                        <input type="password" className="form__input" placeholder="Пароль" autoComplete="on" />
                        <span className="form__validation-error">Что-то пошло не так...</span>
                    </label>
                </>
            } />

        </section>
    );
};

export default Login;