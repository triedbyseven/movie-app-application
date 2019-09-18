import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export type RouteComponentProps<TParams = {}> = Partial<TParams> & {
  path?: string;
};

export interface PrivateRouteProps extends RouteComponentProps {
  component: any;
  isAuthenticated: boolean;
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
