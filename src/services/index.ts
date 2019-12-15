import axios from 'axios';

async function getMovies() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        api_key: 'd5e0b36099a8d8c81c26b508774e8654',
        query: 'fight club'
      }
    }
  );

  return response.data.results;
}

export default getMovies;
