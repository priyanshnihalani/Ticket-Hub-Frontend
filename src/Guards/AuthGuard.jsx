import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = ({ redirectTo = "/login" }) => {
    const isAuthenticated = localStorage.getItem("authDetail");

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
};