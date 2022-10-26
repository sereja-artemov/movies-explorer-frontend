import React from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";

const Login = ({onLogin}) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [email, password] = watch(['email', 'password']);

  function handleFormSubmit() {
    onLogin({ email, password });
  }

  return (
    <section className="signup container">
      <Form
        onSubmit={handleSubmit(handleFormSubmit)}
        formId="signup-form"
        formTitle="Рады видеть!"
        textBottom="Ещё не зарегистрированы?"
        textButton="Войти"
        textLinkBottom="Регистрация"
        LinkBottom="/signup"
        isValid={isValid}
        children={
          <>
            <label className="form__label">
              E-mail
              <input
                type="email"
                className="form__input"
                placeholder="E-mail"
                {...register("email", {
                  required: "Поле обязательно к заполнению",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неправильно введен e-mail"
                  }
                })}
              />
              {errors.email && <span className="form__validation-error">{errors.email.message}</span>}
            </label>
            <label className="form__label">
              Пароль
              <input
                type="password"
                className="form__input"
                placeholder="Пароль"
                autoComplete="on"
                {...register("password", {
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 3,
                    message: "Длина пароля должна быть не менее трех символов"
                  }
                })}
              />
              {errors.password && <span className="form__validation-error">{errors.password.message}</span>}
            </label>
          </>
        }
      />
    </section>
  );
};

export default Login;
