import { useState } from "react";
import "./App.css";
import ImageModal from "./ImageModal/ImageModal";
import Images from "./Images/Images";
import { useGetImagesOnScroll } from "services/app.service";
import OnScrollLoader from "./OnScrollLoader/OnScrollLoader";

/**
 * Application: The main component
 */
function App() {

  const [modalImageUrl, setModalImageUrl] = useState("");
  const [images, loading] = useGetImagesOnScroll();
  
  return (
    <div className="App">
      <main>
        {/* input search container */}
        <section className="py-5 text-center container bg-dark text-white">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Search Images</h1>
            </div>
          </div>
        </section>

        <div className="py-5">
          <Images images={images} setModalImageUrl={setModalImageUrl} />
          <OnScrollLoader loading={loading} />
        </div>

        <ImageModal modalImageUrl={modalImageUrl} />
      </main>
    </div>
  );
}

export default App;
