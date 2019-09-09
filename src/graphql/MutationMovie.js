import gql from 'graphql-tag';

export default gql`
  mutation(
    $title: String!
    $genre: String!
    $releaseDate: String!
    $userId: ID!
  ) {
    addMovie(
      title: $title
      genre: $genre
      releaseDate: $releaseDate
      userId: $userId
    ) {
      id
      userId
      title
      genre
      releaseDate
    }
  }
`;
