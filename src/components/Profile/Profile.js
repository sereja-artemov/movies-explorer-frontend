import React, {createRef, useContext, useEffect, useState} from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import {useForm} from "react-hook-form";

const Profile = ({onLogout, onUpdateUser}) => {

  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors, isValid },
  } = useForm({ mode: "onChange", defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    } });

  let [name, email] = watch(['name', 'email']);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');

  const [onEdit, setOnEdit] = useState(false);


  // useEffect(() => {
  //   name = currentUser.name;
  //   // nameInput.current.value = currentUser.name;
  //   // setEmail(currentUser.email);
  // }, [])

  function handleFormSubmit() {
    onUpdateUser({ name, email });
  }

  return (
    <section className="profile container">
      <form action="POST" className="profile__form">
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
            <label htmlFor="profile-email" className="profile__label">
              E-mail
            </label>
          </div>
        </fieldset>
        <fieldset className="profile__fields profile__fields--settings">
          { onEdit ? (
            <button onClick={handleSubmit(handleFormSubmit)} type="button" className="profile__btn btn" disabled={isValid}>
              Сохранить
            </button>
          ) : (
            <input
              onClick={() => setOnEdit(!onEdit)}
              type="submit"
              className="profile__form-submit"
              value="Редактировать"
            />
          )}
          <button
            onClick={onLogout}
            type="button"
            className="profile__logout"
          >
            Выйти из аккаунта
          </button>
          {errors && <span className="profile__error">
            {errors.message}
          </span>}

        </fieldset>
      </form>
    </section>
  );
};

export default Profile;
