import "./ImageModal.css";
import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";

function ImageModal({modalImageUrl}) {
  const imageModalRef = useRef(null);

  useEffect(() => {
    // add eventlisner for modal
    const imageModal = new Modal(document.getElementById("imageModal"));
    imageModalRef.current = imageModal;
  }, []);

  useEffect(() => {
    if (modalImageUrl && imageModalRef.current) imageModalRef.current.show();
  }, [modalImageUrl]);

  return (
    <div
      className="ImageModal modal fade"
      id="imageModal"
      tabIndex="-1"
      aria-labelledby="imageModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content bg-dark">
          <div className="modal-body">
            <img className="img-height-only" src={modalImageUrl} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
