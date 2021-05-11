import "./Images.css";

function Images({images, setModalImageUrl}) {
  return (
    <div className="Images container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {images.map((image) => (
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
        ))}
      </div>
    </div>
  );
}

export default Images;
