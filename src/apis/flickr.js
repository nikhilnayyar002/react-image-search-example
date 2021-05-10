import { CONFIG } from "appConfig"

/******************** commo handler */

function commonApiRecipe(api) {
    return fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data["stat"] === "ok")
                return data
            else
                throw new Error("Error fetching results.")
        })
}

/******************* apis */

function getRecentImages(page = 1) {
    return commonApiRecipe(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${CONFIG.API_KEY}&per_page=10&format=json&nojsoncallback=1&page=${page}`)
        .then(data => data.photos.photo)
}

function getImageUrl(photoID) {
    return commonApiRecipe(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${CONFIG.API_KEY}&per_page=10&format=json&nojsoncallback=1&photo_id=${photoID}`)
        .then(
            data => ({ url: data.sizes.size[data.sizes.size.length - 1].source, id: photoID + new Date().getTime() })
        )
}

/******************* api recipes */

export function getImages(page) {
    return getRecentImages(page)
        .then(
            photos => Promise.all(
                photos.map(
                    photo => getImageUrl(photo.id).catch(() => null) // #51021-72621 if photo cannot be fetched return null
                )
            )
        )
        .then(imgs => imgs.filter(img => img !== null)) // individual urls can be null. see #51021-72621
        .catch(() => []) // getRecentImages can fail so return empty array
}