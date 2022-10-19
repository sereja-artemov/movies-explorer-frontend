import React, {useEffect, useState} from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";

const Register = ({onRegister}) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [name, email, password] = watch(['name','email', 'password']);

  function handleFormSubmit() {
    debugger
    onRegister({name, email, password})
  }

  return (
    <section className="signup container">
      <Form
        onSubmit={handleSubmit(handleFormSubmit)}
        formId="signup-form"
        formTitle="Добро пожаловать!"
        textBottom="Уже зарегистрированы?"
        textButton="Зарегистрироваться"
        textLinkBottom="Войти"
        LinkBottom="/signin"
        isValid={isValid}
        children={
          <>
            <label className="form__label">
              Имя
              <input
                // onChange={(e) => setName(watch.name)}
                type="text"
                className="form__input"
                placeholder="Имя"
                {...register("name", {
                  required: "Поле обязательно к заполнению",
                  pattern: {
                    value: /^[а-яА-ЯёЁa-zA-Z0-9 -]+$/i,
                    message: "Имя может содержать только латиницу, кириллицу, пробел или дефис."
                  }
                })}
              />

              {errors.name && <span className="form__validation-error">{errors.name.message}</span>}

            </label>
            <label className="form__label">
              E-mail
              <input
                // onChange={(e) => setEmail(e.target.value)}
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
                // onChange={(e) => setPassword(e.target.value)}
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

export default Register;
