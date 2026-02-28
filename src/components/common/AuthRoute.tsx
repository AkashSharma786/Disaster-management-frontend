import type { JSX } from "react";
import { Navigate } from "react-router";


const AuthRoute = () => {

  if ( true /*isAuthenticated()*/) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default AuthRoute;