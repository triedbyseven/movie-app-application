import gql from 'graphql-tag';

export default gql`
  mutation($userName: String!, $password: String!) {
    loginUser(userName: $userName, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
