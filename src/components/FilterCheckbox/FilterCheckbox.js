import React from "react";

const FilterCheckbox = ({ label, inputId, name, setIsChecked, isChecked }) => {

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <label htmlFor={inputId} className="form__radio-label">
      <input
        onChange={handleCheck}
        className="filter__checkbox"
        id={inputId}
        name={name}
        type="checkbox"
        value={label}
        checked={isChecked}
      />
      <span className="filter__checkbox-indicator"></span>
      {label}
    </label>
  );
};

export default FilterCheckbox;
