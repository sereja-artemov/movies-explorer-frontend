import React from 'react';

const SearchForm = () => {
    return (
        <form id="search-form" method="post" className="search-form">
            <div className="search-form__field-wrapper">
                <input type="email" name="email" className="search-form__search-input" placeholder="Фильм" />
                <input type="submit" name="submit" className="search-form__submit" value="" />
            </div>
            <div className="search-form__checkbox-wrapper">
                <input className="search-form__checkbox" id="short-films" type="checkbox"/>
                <label className="search-form__label" for="short-films">Короткометражки</label>
            </div>
        </form>
    );
};

export default SearchForm;