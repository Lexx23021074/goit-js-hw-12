import axios from 'axios';
const API_KEY = '56318160-8874d10fff9d5cc9a89c98525';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}