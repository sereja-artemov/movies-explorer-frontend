import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import {useForm} from "react-hook-form";

const Profile = ({handleLogout, handleUpdateUser, profileError}) => {

  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors, isValid, defaultValues },
  } = useForm({ mode: "onChange", defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    } });

  let [name, email] = watch(['name', 'email']);

  function handleFormSubmit() {
    handleUpdateUser({ name, email })
  }

  return (
    <section className="profile container">
      <form action="POST" className="profile__form" noValidate>
        <fieldset className="profile__fields">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="profile__field-wrapper">
            <input
              value={name}
              id="profile-name"
              type="text"
              className="profile__input"
              placeholder="Ваше имя"
              {...register("name", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z0-9 -]+$/i,
                  message: "Имя может содержать только латиницу, кириллицу, пробел или дефис."
                }
              })}
            />
            {errors.name && <span className="profile__error">{errors.name.message}</span>}
            <label htmlFor="profile-name" className="profile__label">
              Имя
            </label>
          </div>
          <div className="profile__field-wrapper">
            <input
              value={email}
              id="profile-email"
              type="email"
              className="profile__input"
              placeholder="Ваша почта"
              {...register("email", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Неправильно введен e-mail"
                }
              })}
            />
            {errors.email && <span className="profile__error">{errors.email.message}</span>}
            <label htmlFor="profile-email" className="profile__label">
              E-mail
            </label>
          </div>
        </fieldset>
        <fieldset className="profile__fields profile__fields--settings">

          <input
            onClick={handleSubmit(handleFormSubmit)}
            type="submit"
            className="profile__form-submit"
            value="Редактировать"
            disabled={isValid && defaultValues.name === name && defaultValues.email === email}
          />

          <button
            onClick={handleLogout}
            type="button"
            className="profile__logout"
          >
            Выйти из аккаунта
          </button>
          <span className="profile__error">
            {profileError}
          </span>

        </fieldset>
      </form>
    </section>
  );
};

export default Profile;
