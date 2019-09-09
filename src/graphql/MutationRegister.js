import gql from 'graphql-tag';

export default gql`
  mutation($userName: String!, $email: String!, $password: String!) {
    registerUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
