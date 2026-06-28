import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();

 const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please fill in the field!' });
    return;
  }

  clearGallery(); // Очищуємо галерею
  showLoader(); // Показуємо лоадер

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(data.hits); // Рендеримо
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong, please try again later.',
    });
  } finally {
    hideLoader(); // Ховаємо лоадер
  }
});
