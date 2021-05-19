import "./App.css";
import SearchInput from "components/SearchInput/SearchInput";
import Images from "components/Images/Images";
import { TextSuggestionsContextWrap } from "components/other/TextSuggestionsContextWrap/TextSuggestionsContextWrap";
import { SearchTextContextWrap } from "components/other/SearchTextContextWrap/SearchTextContextWrap";

/**
 * Application: The main component
 */
function App() {
  return (
    <>
      <TextSuggestionsContextWrap>
        <SearchTextContextWrap>
          <div className="App">
            <main>
              {/* input search container */}
              <section className="py-5 text-center bg-dark text-white">
                <div className="row py-lg-5 container mx-auto">
                  <div className="col-lg-6 col-md-8 mx-auto px-0">
                    <h1 className="fw-light">Search Photos</h1>
                    <SearchInput />
                  </div>
                </div>
              </section>
              <Images />
            </main>
          </div>
        </SearchTextContextWrap>
      </TextSuggestionsContextWrap>
    </>
  );
}

export default App;
