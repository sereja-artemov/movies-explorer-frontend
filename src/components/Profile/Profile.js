import React from 'react';

const Profile = () => {
    return (
        <section className="profile container">
            <form action="POST" className="profile__form">
                <fieldset className="profile__fields">
                    <h1 className="profile__title">Привет, Виталий!</h1>
                    <div className="profile__field-wrapper">
                        <input id="profile-name" type="text" className="profile__input" placeholder="Ваше имя" />
                        <label htmlFor="profile-name" className="profile__label">Имя</label>
                    </div>
                    <div className="profile__field-wrapper">
                        <input id="profile-email" type="email" className="profile__input" placeholder="Ваша почта" />
                        <label htmlFor="profile-email" className="profile__label">E-mail</label>
                    </div>
                </fieldset>
                <fieldset className="profile__fields profile__fields--settings">
                    <input type="submit" className="profile__form-submit" value="Редактировать"/>
                    <button className="profile__logout">Выйти из аккаунта</button>
                    <button className="profile__btn btn">Сохранить</button>
                    <span className="profile__error">При обновлении профиля произошла ошибка.</span>
                </fieldset>
            </form>

        </section>
    );
};

export default Profile;
