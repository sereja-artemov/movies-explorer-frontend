import React, {useEffect} from "react";

const FilterCheckbox = ({ isShort, setIsShort, inputId, label, name }) => {



  function handleChangeCheckbox() {
    setIsShort(!isShort);
  }

  return (
    <label htmlFor={inputId} className="form__radio-label">
      <input
        onChange={handleChangeCheckbox}
        className="filter__checkbox"
        id={inputId}
        name={name}
        type="checkbox"
        value={label}
        checked={isShort}
      />
      <span className="filter__checkbox-indicator"></span>
      {label}
    </label>
  );
};

export default FilterCheckbox;
