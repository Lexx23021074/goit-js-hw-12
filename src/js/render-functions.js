import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader-container');
const loadMoreBtnEl = document.querySelector('.load-more-btn'); // Додали селектор для кнопки

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// 1. Створює розмітку і ДОДАЄ її в контейнер, після чого оновлює лайтбокс
export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${img.likes}</p>
        <p><b>Views:</b> ${img.views}</p>
        <p><b>Comments:</b> ${img.comments}</p>
        <p><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  // ВАЖЛИВО: використовуємо insertAdjacentHTML, щоб нові сторінки додавалися, а не затирали старі
  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

// 2. Очищає вміст контейнера галереї
export function clearGallery() {
  galleryEl.innerHTML = '';
}

// 3. Показує лоадер
export function showLoader() {
  if (loaderEl) loaderEl.classList.remove('hidden');
}

// 4. Ховає лоадер
export function hideLoader() {
  if (loaderEl) loaderEl.classList.add('hidden');
}

// 5. Показує кнопку Load more
export function showLoadMoreButton() {
  if (loadMoreBtnEl) loadMoreBtnEl.classList.remove('hidden');
}

// 6. Ховає кнопку Load more
export function hideLoadMoreButton() {
  if (loadMoreBtnEl) loadMoreBtnEl.classList.add('hidden');
}
