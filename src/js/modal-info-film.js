import { BASE_URL, API_KEY } from './api';
import { refs } from './refs';
import filmDescriptionCreate from '../templates/film-description.hbs';

let filmID = null;

async function loadFilmInfo(movieID) { 
        const url = `${BASE_URL}movie/${movieID}?api_key=${API_KEY}`;
            const response = await fetch(url);
            if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
};

function handleAddToQueue(filmIdentity) {
        console.log("Add To Queue " + filmIdentity);
    }    

function handleAddToWatching(filmIdentity) {
        console.log("Add To Watching " + filmIdentity);
    }        
    
function handleCloseModal() {
        refs.backdrop.classList.add("is-hidden");
        refs.btnAddToWatched.removeEventListener("click", handleAddToWatching);
        refs.btnAddToQueue.removeEventListener("click", handleAddToQueue);
    }
    
function renderFilmInfo(film) {
        console.log(film);
        refs.filmInfoCardImage.innerHTML = `<img class="film-info-card__poster" src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="poster">`;
        refs.filmInfoCardBloque.innerHTML = filmDescriptionCreate(film);
    }

function handleFilmCardClick(ev) {
    const targetObject = ev.target.closest(".film-card");
    if (targetObject) {
            filmID = targetObject.dataset.id;
            refs.backdrop.classList.remove("is-hidden");
            refs.modalClose.addEventListener("click", handleCloseModal);
            refs.btnAddToQueue.addEventListener("click", handleAddToQueue(filmID));
            refs.btnAddToWatched.addEventListener("click", handleAddToWatching(filmID));
            console.log(refs);

            loadFilmInfo(filmID).then(renderFilmInfo);
        }
    }

function modalInfoFilmShow() {
  refs.galleryFilms.addEventListener('click', handleFilmCardClick);
}

modalInfoFilmShow();

export default modalInfoFilmShow;
