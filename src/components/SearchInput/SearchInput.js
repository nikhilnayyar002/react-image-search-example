import { TextSuggestionsContext } from "components/other/TextSuggestionsContextWrap/TextSuggestionsContextWrap";
import { useCallback, useContext, useRef } from "react";
import "./SearchInput.css";
import { useSearchText } from "services/app.service";

function SearchInput() {
  const textSuggestions = useContext(TextSuggestionsContext);
  const [search] = useSearchText();

  const inputRef = useRef(null);

  const onDropdownItemClick = useCallback(
    (sugges) => {
      inputRef.current.value = sugges;
      search(sugges);
    },
    [search]
  );

  return (
    <div className="SearchInput dropdown pt-4">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Search .."
        onInput={(e) => search(e.target.value.trim())}
        id="SearchInputDropdownBtn"
        data-bs-toggle="dropdown"
      />
      <ul
        className="dropdown-menu w-100"
        aria-labelledby="SearchInputDropdownBtn"
      >
        {/* dropdown items */}
        {textSuggestions.texts.map((sugges, i) => (
          <li
            key={i}
            className="dropdown-item text-truncate"
            onClick={() => onDropdownItemClick(sugges)}
          >
            {sugges}
          </li>
        ))}

        {/* clear button */}
        {textSuggestions.texts.length ? (
          <li className="bg-white d-flex dropdown-item justify-content-end">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={textSuggestions.clearState}
            >
              Clear
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default SearchInput;
