import React from "react";
import { Link } from "react-router-dom";

const NavTab = () => {
  return (
    <ul className="nav-tab">
      <li className="nav-tab__item">
        <Link to="#" className="nav-tab__link">
          О проекте
        </Link>
      </li>
      <li className="nav-tab__item">
        <Link to="#" className="nav-tab__link">
          Технологии
        </Link>
      </li>
      <li className="nav-tab__item">
        <Link to="#" className="nav-tab__link">
          Студент
        </Link>
      </li>
    </ul>
  );
};

export default NavTab;
