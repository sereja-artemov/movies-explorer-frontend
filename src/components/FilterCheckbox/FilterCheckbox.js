import React from "react";

const FilterCheckbox = ({ isChecked, onCheck, inputId, label, name }) => {

  return (
    <label htmlFor={inputId} className="form__radio-label">
      <input
        onChange={onCheck}
        className="filter__checkbox"
        id={inputId}
        name={name}
        type="checkbox"
        value={label}
        defaultChecked={isChecked}
      />
      <span className="filter__checkbox-indicator"></span>
      {label}
    </label>
  );
};

export default FilterCheckbox;
