import ImageModal from "components/ImageModal/ImageModal";
import OnScrollLoader from "components/OnScrollLoader/OnScrollLoader";
import { useState } from "react";
import { useGetImagesOnScroll } from "services/app.service";
import "./Images.css";

function Images() {
  const [images, loading] = useGetImagesOnScroll();
  const [modalImageUrl, setModalImageUrl] = useState("");

  return (
    <div className="Images py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {!images.length && !loading ? (
            <p className="text-center w-100">No photos to display.</p>
          ) : (
            images.map((image) => (
              <div key={image.id} className="col">
                <div className="image-cont">
                  <img
                    onClick={() => setModalImageUrl(image.url)}
                    className="image img-height-only"
                    src={image.url}
                    alt=""
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <OnScrollLoader loading={loading} />
      <ImageModal modalImageUrl={modalImageUrl} />
    </div>
  );
}

export default Images;
