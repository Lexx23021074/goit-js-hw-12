import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Глобальні змінні для контролю пагінації
let query = '';
let page = 1;
const perPage = 15; // Кількість елементів в одному запиті (згідно з ТЗ)

// 1. Обробник сабміту форми (Перший пошук)
form.addEventListener('submit', async event => {
  event.preventDefault();

  // Оновлюємо пошукове слово і скидаємо сторінку до 1
  query = event.target.elements.searchQuery.value.trim();
  page = 1;

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please fill in the field!' });
    return;
  }

  clearGallery(); // Очищаємо попередні результати
  hideLoadMoreButton(); // Ховаємо кнопку перед новим запитом
  showLoader(); // Показуємо лоадер

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.warning({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    // Рендеримо першу порцію зображень
    createGallery(data.hits);

    // Перевіряємо, чи є ще сторінки для завантаження
    if (data.totalHits > perPage) {
      showLoadMoreButton();
    } else {
      // Виправлення для ментора: якщо картинки є, але їх загальна кількість менша або дорівнює 15,
      // кнопку не показуємо, але ОДРАЗУ виводимо повідомлення про кінець колекції
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong, please try again later.',
    });
  } finally {
    hideLoader();
    form.reset(); // Очищаємо інпут після сабміту
  }
});

// 2. Обробник кліку на кнопку "Load more" (Пагінація)
loadMoreBtn.addEventListener('click', async () => {
  page += 1; // Збільшуємо номер сторінки на 1

  hideLoadMoreButton(); // Ховаємо кнопку під час завантаження
  showLoader(); // Показуємо лоадер ПІД кнопкою

  try {
    const data = await getImagesByQuery(query, page);

    // Додаємо нові зображення в DOM (функція всередині використовує insertAdjacentHTML)
    createGallery(data.hits);

    // Логіка плавного скролу сторінки після додавання елементів
    smoothScroll();

    // Перевіряємо, чи ми дійшли до кінця колекції
    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton(); // Якщо картинки ще є, повертаємо кнопку
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load more images.',
    });
  } finally {
    hideLoader();
  }
});

// 3. Функція плавного прокручування сторінки
function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  if (galleryItem) {
    // Отримуємо висоту однієї картки
    const { height: cardHeight } = galleryItem.getBoundingClientRect();

    // Прокручуємо на дві高度 картки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
