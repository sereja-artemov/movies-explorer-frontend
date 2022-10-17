import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import {updateUser} from "../../utils/MoviesApi";

const Profile = ({onLogout, onUpdateUser}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [onEdit, setOnEdit] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [])

  function handleSubmit() {
    onUpdateUser(name, email);
  }

  return (
    <section className="profile container">
      <form action="POST" className="profile__form">
        <fieldset className="profile__fields">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="profile__field-wrapper">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              id="profile-name"
              type="text"
              className="profile__input"
              placeholder="Ваше имя"
              required
            />
            <label htmlFor="profile-name" className="profile__label">
              Имя
            </label>
          </div>
          <div className="profile__field-wrapper">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="profile-email"
              type="email"
              className="profile__input"
              placeholder="Ваша почта"
              required
            />
            <label htmlFor="profile-email" className="profile__label">
              E-mail
            </label>
          </div>
        </fieldset>
        <fieldset className="profile__fields profile__fields--settings">
          { onEdit ? (
            <button onClick={handleSubmit} type="button" className="profile__btn btn">
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
          <span className="profile__error">
            При обновлении профиля произошла ошибка.
          </span>
        </fieldset>
      </form>
    </section>
  );
};

export default Profile;
