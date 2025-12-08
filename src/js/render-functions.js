import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {

    gallery: document.querySelector(".js-gallery"),
    loader: document.querySelector(".js-loader"),
    loadMoreBtn: document.querySelector(".js-load-more"),
}

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});


// ======== TEMPLATE FOR ONE IMAGE ===
function imageTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <li class = "gallery-item">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="200"/>
        </a>
        <div class="card-info">
            <div class="headers"><span>Likes</span><span>Views</span><span>Comments</span><span>Downloads</span></div>
            <div class="values"><span>${likes}</span><span>${views}</span><span>${comments}</span><span>${downloads}</span></div>
        </div>
    </li>`;
}
// ======== TEMPLATE FOR ARRAY OF IMAGES ===
function galleryTemplate(images) {
    return images.map(imageTemplate).join("")
}
// =========================================
export function createGallery(images) {
    const markup = galleryTemplate(images);
    refs.gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}

//=======================================

export function clearGallery(){
  refs.gallery.innerHTML = "";
}
//======================================

export function showLoader() {
    refs.loader.classList.remove("hidden")
}
//========================================

export function hideLoader() {
    refs.loader.classList.add("hidden")
}
//==========================================
export function showLoadMoreButton() {
    refs.loadMoreBtn.classList.remove("hidden")
}

export function hideLoadMoreButton() {
    refs.loadMoreBtn.classList.add("hidden")
}

export function checkBtnStatus(page, totalPages) {
    if (page < totalPages) {
        showLoadMoreButton();
    } else {
        hideLoadMoreButton(); 
    }
}