import React from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

const SearchForm = ({
  setSearchQuery, setIsShort, isShort, inputValue, setInputValue
}) => {

  function handleSubmitForm(event) {
    event.preventDefault();
    setSearchQuery(inputValue);
  }

  function handleSearchInput(event) {
    setInputValue(event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      id="search-form"
      method="post"
      className="search-form"
    >
      <div className="search-form__field-wrapper">
        <input
          onChange={handleSearchInput}
          type="text"
          name="text"
          className="search-form__search-input"
          placeholder="Фильм"
          value={inputValue}
        />
        <label
          htmlFor="search-film-submit"
          className="search-form__submit-label"
        >
          <button
            id="search-film-submit"
            type="submit"
            name="submit"
            className="search-form__submit"
            value=""
          />
          <svg
            className="search-form__submit-icon"
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.79194 8.2638C6.36002 9.69572 4.03842 9.69572 2.60649 8.2638C1.17457 6.83188 1.17457 4.51027 2.60649 3.07835C4.03842 1.64643 6.36002 1.64643 7.79194 3.07835C9.22387 4.51027 9.22387 6.83188 7.79194 8.2638ZM8.23233 9.64676C6.2721 11.1462 3.45651 10.9994 1.66368 9.20661C-0.288937 7.25399 -0.288936 4.08816 1.66368 2.13554C3.61631 0.182918 6.78213 0.182918 8.73475 2.13554C10.5275 3.92829 10.6743 6.74371 9.1751 8.70392L12.7418 12.2706L11.799 13.2134L8.23233 9.64676Z"
              fill="white"
            />
          </svg>
        </label>
      </div>
      <div className="search-form__checkbox-wrapper">
        <FilterCheckbox
          isShort={isShort}
          setIsShort={setIsShort}
          label="Короткометражки"
          inputId="short-films"
          name="short-films"
        />
      </div>
    </form>
  );
};

export default SearchForm;
