import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthorizedRoute({ component: Component, ...rest }) {
  const authorization = useSelector((state) => state.user.authorization);
  return (
    <Route
      {...rest}
      render={(props) => (!authorization ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

export default AuthorizedRoute;
