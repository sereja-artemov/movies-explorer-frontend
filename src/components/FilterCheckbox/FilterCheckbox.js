import React from 'react';

const FilterCheckbox = ({ label, inputId, name }) => {
    return (
        <label htmlFor={inputId} className="form__radio-label">
            <input className="filter__checkbox" id={inputId} name={name} type="checkbox" value={label}/>
            <span className="filter__checkbox-indicator"></span>
            {label}
        </label>
    );
};

export default FilterCheckbox;
