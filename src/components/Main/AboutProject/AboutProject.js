import React from 'react';
import TitleBlock from '../../TitleBlock/TitleBlock';

const AboutProject = () => {
    return (
        <section className="about-project container">
            <TitleBlock title="О проекте" />
            <ul className="about-project__text-block">
                <li className="about-project__text-wrapper">
                    <h2 className="about-project__text-title">Дипломный проект включал 5 этапов</h2>
                    <p className="about-project__text-content">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="about-project__text-wrapper">
                    <h2 className="about-project__text-title">На выполнение диплома ушло 5 недель</h2>
                    <p className="about-project__text-content">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="timeline">
                <div className="timeline__item timeline__item-backend">
                    <div className="timeline__duration"><span>1 неделя</span></div>
                    <p className="timeline__name">Back-end</p>
                </div>
                <div className="timeline__item timeline__item-frontend">
                    <div className="timeline__duration"><span>4 недели</span></div>
                    <p className="timeline__name">Front-end</p>
                </div>
            </div>
        </section>
    );
};

export default AboutProject;
