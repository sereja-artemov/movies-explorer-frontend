import React, {useState} from "react";
import Form from "../Form/Form";

const Register = ({onRegister}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault()
    onRegister({name, email, password})
  }

  return (
    <section className="signup container">
      <Form
        onSubmit={handleFormSubmit}
        formId="signup-form"
        formTitle="Добро пожаловать!"
        textBottom="Уже зарегистрированы?"
        textButton="Зарегистрироваться"
        textLinkBottom="Войти"
        LinkBottom="/signin"
        children={
          <>
            <label className="form__label">
              Имя
              <input onChange={(e) => setName(e.target.value)} type="text" className="form__input" placeholder="Имя" required />
              <span className="form__validation-error">
                Что-то пошло не так...
              </span>
            </label>
            <label className="form__label">
              E-mail
              <input
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

export default Register;
