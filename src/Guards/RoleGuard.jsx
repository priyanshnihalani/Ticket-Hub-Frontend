import { Navigate, Outlet } from "react-router-dom";

export const RoleGuard = ({ allowedRoles = [], redirectTo = "/unauthorized" }) => {
  const authData = JSON.parse(localStorage.getItem("authDetail-tickethub") || "{}");
  const role = authData?.role;

  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace /> 
  }

  return <Outlet />;
};
