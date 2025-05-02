import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../reduxstore/app/hooks";// Ensure this path is correct

const ProtectedRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.login.login); // Adjust state path as needed

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
