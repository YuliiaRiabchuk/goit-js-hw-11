import axios from 'axios';
import { fetchPixabayApi } from './fetch';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.js-form');

let page = 1;
let searchQuery = '';
let lightBox = new SimpleLightbox('.gallery div a');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  page = 1;

  searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .replaceAll(/\s+/g, '+');

  //   loadImg();
//   loadMarkup();
  gallery.innerHTML = '';

  if (searchQuery === '') {
    Notiflix.Notify.info('Please, enter something to search!');
    return;
  }

  fetchPixabayApi(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        createMarkup(data.hits);
        // foundImg();
        lightBox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(err => console.log(err.message));
}

// function loadImg() {

// }

// function foundImg() {}

function createMarkup(arr) {
  const markup = arr.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      `   <div class="photo-card">
    
    <a class="gallery__item" href='${largeImageURL}'>
    <img class="img"
         src="${webformatURL}" 
         alt="${tags}" 
         loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes <span class="desk"> ${likes} </span></b>
      </p>
      <p class="info-item">
        <b>Views  <span class="desk">${views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments <span class="desk">${comments}</span></b>
      </p>
      <p class="info-item">
        <b>Downloads <span class="desk">${downloads}</span></b>
      </p>
    </div>
  </div>`
  ).join('')
  gallery.insertAdjacentHTML('beforeend', markup)
}


