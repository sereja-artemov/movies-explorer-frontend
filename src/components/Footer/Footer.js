import React from "react";

const Footer = () => {
  return (
    <footer className="footer container">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__content-wrapper">
        <ul className="footer__list">
          <li className="footer__list-item">
            <a rel="noreferrer noopener" href="https://practicum.yandex.ru/" target="_blank" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a rel="noreferrer noopener" href="https://github.com/sereja-artemov" target="_blank" className="footer__link">
              Github
            </a>
          </li>
        </ul>
        <span className="footer__copyright">©2022</span>
      </div>
    </footer>
  );
};

export default Footer;
