import { getImages } from "apis/flickr";
import { useEffect, useRef, useState } from "react";

export function useGetImagesOnScroll() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageRef = useRef(1);

    useEffect(() => {
      let loading = true;
  
      // initially fetch images
  
      getImages().then((imgs) => {
        setImages(() => imgs);
  
        setLoading(false);
        loading = false;
      });
  
      // add event listner on scroll
  
      window.addEventListener(
        "scroll",
        () => {
          const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;
  
          if (scrollTop + clientHeight >= scrollHeight - 5) {
            if (loading) return;
  
            setLoading(true); // UI loader only since its async
            loading = true; //actual sync updates
  
            const page = ++pageRef.current;
  
            getImages(page).then((imgs) => {
              setImages((oldImgs) => oldImgs.concat(imgs));
  
              setLoading(false);
              loading = false;
            });
          }
        },
        {
          passive: true,
        }
      );
    }, []);

    return [images, loading]
}