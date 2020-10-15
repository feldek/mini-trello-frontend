import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  let authorization = useSelector((state) => state.user.authorization);  
  return (
    <Route
      {...rest}
      render={(props) =>
        authorization ? <Component {...props} /> : <Redirect to={"/authorization/login"} />
      }
    />
  );
}

export default ProtectedRoute;
