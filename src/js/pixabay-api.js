import axios from 'axios';
const API_KEY = '56318160-8874d10fff9d5cc9a89c98525';
const BASE_URL = 'https://pixabay.com/api/';
/**
 * Здійснює HTTP-запит до Pixabay API
 * @param {string} query - Пошукове слово
 * @param {number} page - Номер сторінки для пагінації
 * @returns {Promise<object>} - Об'єкт data з відповіді бекенду
 */
export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page, // Додаємо динамічну сторінку
    per_page: 15, // Обмежуємо кількість до 15 за умовою ТЗ
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
