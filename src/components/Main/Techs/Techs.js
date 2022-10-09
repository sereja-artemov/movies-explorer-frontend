import React from "react";
import TitleBlock from "../../TitleBlock/TitleBlock";

const Techs = () => {
  return (
    <section className="techs">
      <div className="container">
        <TitleBlock title="Технологии" />
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__card">
          <li className="techs__card-item">
            <span>HTML</span>
          </li>
          <li className="techs__card-item">
            <span>CSS</span>
          </li>
          <li className="techs__card-item">
            <span>JS</span>
          </li>
          <li className="techs__card-item">
            <span>React</span>
          </li>
          <li className="techs__card-item">
            <span>Git</span>
          </li>
          <li className="techs__card-item">
            <span>Express.js</span>
          </li>
          <li className="techs__card-item">
            <span>mongoDB</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
