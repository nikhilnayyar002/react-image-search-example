import { getImages } from "apis/flickr";
import { useCallback, useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

//return images and loading state and also on scroll return new images concatinated with old one
export function useGetImagesOnScroll(text) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(1);

  useEffect(() => {
    let discardResults = false, //discard the result if useeffect is rerun whenever its dependency changes
      loading = false;

    function setImagesWithLogic(imgs) {
      if (!discardResults) {
        setImages((oldImgs) => oldImgs.concat(imgs));

        setLoading(false);
        loading = false;
      }
    }

    function setLoadingWithLogic(cond) {
      setLoading(cond); // UI loader only since its async
      loading = cond; //actual sync updates
    }

    // initial setup
    pageRef.current = 1; //reset page
    setImages(() => []); //reset images
    setLoadingWithLogic(true);
    getImages(pageRef.current, text).then(setImagesWithLogic);

    // add event listner on scroll

    function listner() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (loading) return;

        setLoadingWithLogic(true);
        getImages(++pageRef.current, text).then(setImagesWithLogic);
      }
    }

    window.addEventListener("scroll", listner, { passive: true });

    return () => {
      discardResults = true;
      window.removeEventListener("scroll", listner);
    };
  }, [text]);

  return [images, loading];
}

// set latest text after certain interval of time to avoid calling api unneccessarily
export function useSearchText(setText) {
  const searchTermsC = useRef(new Subject());

  const search = useCallback((text) => searchTermsC.current.next(text), []);

  useEffect(() => {
    let subs = searchTermsC.current
      .pipe(
        debounceTime(500),
        map((term) => term.trim())
      )
      .subscribe((text) => setText(text));

    return () => subs.unsubscribe();
  }, [setText]);

  return [search];
}
