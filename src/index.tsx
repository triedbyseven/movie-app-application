import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import App from './App';
import { StoreProvider } from './Store';
import './index.css';
import * as serviceWorker from './serviceWorker';

export interface IndexProps {
  component?: any;
  children?: any;
}

const ApolloWrapper: React.SFC<IndexProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token = Cookies.get('Authorization') || '';
    token = token.split(' ')[1];
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

ReactDOM.render(
  <StoreProvider>
    <ApolloWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloWrapper>
  </StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
