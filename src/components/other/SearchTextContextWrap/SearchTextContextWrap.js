import { createContext, useState } from "react";

const INI_STATE = {
  text: "",
  setText: null,
};

const SearchTextContext = createContext(INI_STATE);
SearchTextContext.displayName = "SearchTextContext";

function SearchTextContextWrap({ children }) {
  let [state, setState] = useState({
    ...INI_STATE,
    setText: _setState,
  });

  function _setState(text) {
    setState((state) => ({ ...state, text }));
  }

  return (
    <SearchTextContext.Provider value={state}>
      {children}
    </SearchTextContext.Provider>
  );
}

export { SearchTextContext, SearchTextContextWrap };
