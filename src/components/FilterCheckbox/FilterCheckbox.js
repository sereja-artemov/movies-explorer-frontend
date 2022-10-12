import React from "react";

const FilterCheckbox = ({ label, inputId, name, setIsChecked, isChecked, localStorageMovies }) => {

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <label htmlFor={inputId} className="form__radio-label">
      <input
        onClick={handleCheck}
        className="filter__checkbox"
        id={inputId}
        name={name}
        type="checkbox"
        value={label}
        checked={localStorageMovies.checked}
      />
      <span className="filter__checkbox-indicator"></span>
      {label}
    </label>
  );
};

export default FilterCheckbox;
