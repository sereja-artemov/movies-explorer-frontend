import React from 'react';
import Form from "../Form/Form";

const Register = () => {
    return (
        <section className="signup container">
            <Form formId="signup-form" formTitle="Добро пожаловать!" textBottom="Уже зарегистрированы?" textButton="Зарегистрироваться" textLinkBottom="Войти" children={
                <>
                    <label className="form__label">
                        Имя
                        <input type="text" className="form__input" placeholder="Имя" />
                    </label>
                    <label className="form__label">
                        E-mail
                        <input type="email" className="form__input" placeholder="E-mail" />
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

export default Register;