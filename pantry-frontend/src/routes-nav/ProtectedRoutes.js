import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function ProtectedRoute({ exact, path, children }) {
  //if there are paramaters grabs the parameter id
  const { currentUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "exact=",
    exact,
    "path=",
    path,
    "currentUser=",
    currentUser
  );

  if (!currentUser) {
    console.log(currentUser);
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}
//   const auth = useContext(AuthContext);
//   const isLoggedIn = auth.isLoggedIn;
//   console.log(isLoggedIn);
//   console.log(Component);
//   //if the user is logged in then allows the protected route to be rendered
//   // otherwise user is redirected to home screen
//   return (
//     <Route>
//       {!isLoggedIn ? (
//         <Redirect to="/login" />
//       ) : (
//         <Component {...rest} params={id} />
//       )}
//     </Route>
//   );
// }

export default ProtectedRoute;
