import { TextSuggestionsContext } from "components/other/TextSuggestionsContextWrap/TextSuggestionsContextWrap";
import { useCallback, useContext, useRef } from "react";
import "./SearchInput.css";

function SearchInput({ search }) {
  const textSuggestions = useContext(TextSuggestionsContext);

  const inputRef = useRef(null);

  const searchT = useCallback((text) => search(text), [search]);

  const onDropdownItemClick = useCallback(
    (sugges) => {
      inputRef.current.value = sugges;
      searchT(sugges);
    },
    [searchT]
  );

  return (
    <div className="SearchInput dropdown pt-4">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Search .."
        onInput={(e) => searchT(e.target.value.trim())}
        id="SearchInputDropdownBtn"
        data-bs-toggle="dropdown"
      />
      <ul
        className="dropdown-menu w-100"
        aria-labelledby="SearchInputDropdownBtn"
      >
        {textSuggestions.texts.map((sugges, i) => (
          <li
            key={i}
            className="dropdown-item text-truncate"
            onClick={() => onDropdownItemClick(sugges)}
          >
            {sugges}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchInput;
