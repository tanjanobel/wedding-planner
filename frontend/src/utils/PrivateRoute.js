import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// If user is logged in private routes will be rendered otherwise redirect to login page
const PrivateRoute = ({ children }) => {
  let { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
