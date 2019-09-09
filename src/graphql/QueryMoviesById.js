import gql from 'graphql-tag';

export default gql`
  query {
    getAllMovies {
      id
      userId
      title
      genre
      releaseDate
    }
  }
`;
