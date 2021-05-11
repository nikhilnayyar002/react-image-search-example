import { useState } from "react";
import "./App.css";
import ImageModal from "./ImageModal/ImageModal";
import Images from "./Images/Images";
import { useGetImagesOnScroll, useSearchText } from "services/app.service";
import OnScrollLoader from "./OnScrollLoader/OnScrollLoader";
import SearchInput from "./SearchInput/SearchInput";
import { TextSuggestionsContextWrap } from "./other/TextSuggestionsContextWrap/TextSuggestionsContextWrap";

/**
 * Application: The main component
 */
function AppMain() {
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [text, setText] = useState("");
  const [search] = useSearchText(setText);
  const [images, loading] = useGetImagesOnScroll(text);

  return (
    <div className="App">
      <main>
        {/* input search container */}
        <section className="py-5 text-center bg-dark text-white">
          <div className="row py-lg-5 container mx-auto">
            <div className="col-lg-6 col-md-8 mx-auto px-0">
              <h1 className="fw-light">Search Photos</h1>
              <SearchInput search={search} />
            </div>
          </div>
        </section>

        <div className="py-5">
          <Images images={images} setModalImageUrl={setModalImageUrl} loading={loading} />
          <OnScrollLoader loading={loading} />
        </div>

        <ImageModal modalImageUrl={modalImageUrl} />
      </main>
    </div>
  );
}

function App() {
  return (
    <TextSuggestionsContextWrap>
      <AppMain />
    </TextSuggestionsContextWrap>
  )
}

export default App;
