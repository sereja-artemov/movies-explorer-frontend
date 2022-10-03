import React from 'react';

const Profile = () => {
    return (
        <section className="profile container">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form action="POST" className="profile__form">
                <div className="profile__field-wrapper">
                    <input id="profile-name" type="text" className="profile__input" value="Виталий" />
                    <label htmlFor="profile-name" className="profile__label">Имя</label>
                </div>
                <div className="profile__field-wrapper">
                    <input id="profile-email" type="email" className="profile__input" value="pochta@yandex.ru" />
                    <label htmlFor="profile-email" className="profile__label">E-mail</label>
                </div>
            </form>
        </section>
    );
};

export default Profile;
