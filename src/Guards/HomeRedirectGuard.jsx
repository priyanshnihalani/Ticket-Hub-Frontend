import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
  const authData = JSON.parse(localStorage.getItem("authDetail") || "{}");
  const role = authData?.role;

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (role === "user") {
    return <Navigate to="/user/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
