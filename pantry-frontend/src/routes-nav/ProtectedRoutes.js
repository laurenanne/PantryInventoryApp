import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

// handles protected routes that require authorization.
// checks if there is a current valid user and will only continues to the route if yes. Otherwise redirects to login
function ProtectedRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default ProtectedRoute;
