import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../images/logo.svg";

const Form = ({
  onSubmit,
  formId,
  formTitle,
  children,
  textButton = "Отправить",
  textBottom = "",
  textLinkBottom = "",
  LinkBottom,
  isValid
}) => {
  return (
    <form onSubmit={onSubmit} id={formId} className="form" noValidate >
      <Link to="/" className="form__logo">
        <img
          src={logoImg}
          alt="логотип movies-explorer"
          className="form__logo-img"
        />
      </Link>
      <h3 className="form__title">{formTitle}</h3>
      <fieldset className="form__fields">{children}</fieldset>
      <div className="form__bottom-block">
        <input type="submit" className="form__submit btn" value={textButton} disabled={!isValid} />
        <p className="form__bottom-text">
          {textBottom}{" "}
          <Link to={LinkBottom} className="form__bottom-link">
            {textLinkBottom}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Form;
