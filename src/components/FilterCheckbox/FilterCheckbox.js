import React from 'react';

const FilterCheckbox = ({ label }) => {
    return (
        <label htmlFor="short-films" className="form__radio-label">
            <input className="filter__checkbox" id="short-films" name="film-type" type="checkbox" value="Короткометражки"/>
            <span className="filter__checkbox-indicator"></span>
            {label}
        </label>
    );
};

export default FilterCheckbox;
