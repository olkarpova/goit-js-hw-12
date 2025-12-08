import { getImagesByQuery }  from "./js/pixabay-api"
// import moduleName from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    checkBtnStatus,
} from "./js/render-functions";

const refs = {
    form: document.querySelector(".js-pixabay-form"),
    input: document.querySelector("input[name='search-text']"),
    loadMoreBtn: document.querySelector(".js-load-more")
}
const PAGE_SIZE = 15;
let query = "";
let page;
let totalHits = 0;
let totalPages;

function smoothScroll() {
    const firstCard = document.querySelector(".gallery-item");
    if (!firstCard) return;

    const { height: cardHeight } = firstCard.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth"
    });
}

//===============submit==============================
refs.form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    query = formData.get("search-text").trim();

    // query = e.target.elements["search-text"].value.trim();

    if (!query) {
        iziToast.show({
            title: 'Hey',
            message: 'Please enter a search query!'
        });
        return;
    }

    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    
    
    try {
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            return;
        }

        const images = data.hits;
        createGallery(images);

        totalPages = Math.ceil(totalHits / PAGE_SIZE) 
        
        checkBtnStatus(page, totalPages);
        
        
    } catch (err) {
        iziToast.error({
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
    
    refs.form.reset();
});

//================Load More===========================
refs.loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);
        
        smoothScroll()

        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        } else {
            checkBtnStatus(page, totalPages);
        }

    } catch (err) {
        iziToast.error({
            message: "Something went wrong!",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
});