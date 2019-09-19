import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export type RouteComponentProps<TParams = {}> = Partial<TParams> & {
  path?: string;
  exact?: any;
};

export interface PublicRouteProps extends RouteComponentProps {
  component: any;
  isAuthenticated: boolean;
}

const PublicRoute: React.SFC<PublicRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export default PublicRoute;
