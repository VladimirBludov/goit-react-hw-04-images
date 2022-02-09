import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '25076946-406015110a75827c7826516f1';

async function fetchPictures(searchQuery, page = 1) {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(url).then(response => {
    if (!response?.data?.hits?.length) {
      return Promise.reject(
        new Error(`Sorry, no results were found for ${searchQuery}.`)
      );
    }
    return response;
  });
}

const api = {
  fetchPictures,
};

export default api;
