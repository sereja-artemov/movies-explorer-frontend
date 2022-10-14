import React, { useState } from "react";
import Form from "../Form/Form";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault()
    onLogin({ email, password });
  }

  return (
    <section className="signup container">
      <Form
        onSubmit={handleFormSubmit}
        formId="signup-form"
        formTitle="Рады видеть!"
        textBottom="Ещё не зарегистрированы?"
        textButton="Войти"
        textLinkBottom="Регистрация"
        LinkBottom="/signup"
        children={
          <>
            <label className="form__label">
              E-mail
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="form__input"
                placeholder="E-mail"
                required
              />
              <span className="form__validation-error">
                Что-то пошло не так...
              </span>
            </label>
            <label className="form__label">
              Пароль
              <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="form__input"
                placeholder="Пароль"
                autoComplete="on"
                required
              />
              <span className="form__validation-error">
                Что-то пошло не так...
              </span>
            </label>
          </>
        }
      />
    </section>
  );
};

export default Login;
