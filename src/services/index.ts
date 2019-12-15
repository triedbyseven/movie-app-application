import axios from 'axios';

async function getMovies() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie?api_key=d5e0b36099a8d8c81c26b508774e8654&query=fight%20club'
  );

  console.log(response);
}

export default getMovies;
