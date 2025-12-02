import { Navigate, Outlet } from "react-router-dom";

export const GuestGuard = () => {
  const isAuthenticated = localStorage.getItem("authDetail");
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};
