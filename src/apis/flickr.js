import { CONFIG } from "appConfig";

export const METHODS = {
  getRecent: "getRecent",
  search: "search",
};

/******************** commo handler */

function commonApiRecipe(api) {
  return fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if (data["stat"] === "ok") return data;
      else throw new Error("Error fetching results.");
    });
}

/******************* apis */

function getImageUrl(imageID) {
  return commonApiRecipe(
    `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${CONFIG.API_KEY}&per_page=10&format=json&nojsoncallback=1&photo_id=${imageID}`
  ).then((data) => ({
    url: data.sizes.size[data.sizes.size.length - 1].source,
    id: imageID + new Date().getTime(),
  }));
}

function getRecentImages(page) {
  return commonApiRecipe(
    `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${CONFIG.API_KEY}&per_page=10&format=json&nojsoncallback=1&page=${page}`
  ).then((data) => data.photos.photo);
}

function getImagesByText(page, text) {
  return commonApiRecipe(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${CONFIG.API_KEY}&per_page=10&format=json&nojsoncallback=1&page=${page}&media=photos&text=${text}`
  ).then((data) => data.photos.photo);
}

/******************* api recipes */

export function getImages(page = 1, text = "") {
  return (text === "" ? getRecentImages(page) : getImagesByText(page, text))
    .then((images) =>
      Promise.all(
        images.map(
          (image) => getImageUrl(image.id).catch(() => null) // #51021-72621 if image cannot be fetched return null
        )
      )
    )
    .then((imgs) => imgs.filter((img) => img !== null)) // individual urls can be null. see #51021-72621
    .catch(() => []);
}