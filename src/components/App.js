import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { getImages } from "apis/flickr"
import { Modal } from "bootstrap"

/**
 * Application: The main component
 */
function App() {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const pageRef = useRef(1)

  const [modalImageUrl, setModalImageUrl] = useState("")
  const imageModalRef = useRef(null)

  const onImageClick = useCallback((url) => {
    setModalImageUrl(url)
    if (imageModalRef.current)
      imageModalRef.current.show()
  }, [])

  useEffect(() => {

    let loading = true

    // initially fetch images 

    getImages().then(imgs => {
      setImages(() => imgs)

      setLoading(false)
      loading = false
    })

    // add event listner on scroll

    window.addEventListener('scroll', () => {

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight - 5) {

        if (loading) return

        setLoading(true) // UI loader only since its async
        loading = true //actual sync updates

        const page = ++pageRef.current

        getImages(page).then(imgs => {
          setImages(oldImgs => oldImgs.concat(imgs))

          setLoading(false)
          loading = false
        })

      }

    }, {
      passive: true
    })

    // add eventlisner for modal 
    const imageModal = new Modal(document.getElementById('imageModal'))
    imageModalRef.current = imageModal

  }, [])

  return (
    <div className="App">

      <main>

        {/* input search container */}
        <section className="py-5 text-center container bg-dark text-white">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Search Photos</h1>
            </div>
          </div>
        </section>

        <div className="py-5">
          {/* images container */}
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {
                images.map(image => (
                  <div key={image.id} className="col">
                    <div className="image-cont">
                      <img onClick={() => onImageClick(image.url)} className="image" src={image.url} alt="" role="img" />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* loader */}
          <div id="app-loader-cont" className="align-items-end d-flex justify-content-center">
            {
              loading ? (
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null
            }
          </div>
        </div>


        {/* Modal */}
        <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-dark">
              <div className="modal-body">
                <img src={modalImageUrl} alt="" />
              </div>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}

export default App;
