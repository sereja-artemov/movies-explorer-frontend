import React from "react";
import TitleBlock from "../../TitleBlock/TitleBlock";
import aboutMeImage from "../../../images/about-me.jpg";
import { Link } from "react-router-dom";

const AboutMe = () => {
  return (
    <section className="about-me container">
      <TitleBlock title="Студент" />
      <div className="about-me__content">
        <img src={aboutMeImage} alt="" className="about-me__img" />
        <div className="about-me__description-wrapper">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__status">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="#" className="about-me__github-link">
            Github
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
