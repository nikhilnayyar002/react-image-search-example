import { createContext, useState } from "react";

const USER_SUGGEST = "user_suggestions";
const INI_STATE = {
  texts: JSON.parse(localStorage.getItem(USER_SUGGEST) ?? "[]"),
  changeState: null,
};

const TextSuggestionsContext = createContext(INI_STATE);
TextSuggestionsContext.displayName = "TextSuggestionsContext";

function TextSuggestionsContextWrap({ children }) {
  let [state, setState] = useState({
    ...INI_STATE,
    changeState: _setState,
  });

  function _setState(text) {
    // https://stackoverflow.com/questions/61543226/any-reason-for-a-react-state-hook-set-callback-to-fire-twice
    let texts = null;
    setState((state) => {
      if (!texts) {
        // duplicate texts not allowed
        if (!state.texts.includes(text)) {
          texts = [...state.texts, text];
          localStorage.setItem(USER_SUGGEST, JSON.stringify(texts));
        } else texts = state.texts;
      }
      return { ...state, texts };
    });
  }

  return (
    <TextSuggestionsContext.Provider value={state}>
      {children}
    </TextSuggestionsContext.Provider>
  );
}

export { TextSuggestionsContextWrap, TextSuggestionsContext };
