import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoleGuard } from './Guards/RoleGuard';
import { GuestGuard } from './Guards/GuestGuard';
import { AuthGuard } from './Guards/AuthGuard';
import Login from './Pages/CommonPages/Login';
import Register from './Pages/CommonPages/Register';
import Dashboard from './Pages/UserPages/Dashboard';
import MyBookings from './Pages/UserPages/MyBookings';
import Profile from './Pages/UserPages/Profile';
import AdminDashboard from './Pages/AdminPages/Dashboard';
import AdminBookings from './Pages/AdminPages/Bookings';
import AdminEvents from './Pages/AdminPages/Events';
import Unauthorized from './Pages/CommonPages/Unauthorized';
import ForgotPassword from './Pages/CommonPages/ForgotPassword';
import HomeRedirect from './Guards/HomeRedirectGuard';

import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';
import NotFound from './Pages/CommonPages/NotFound';
import Events from './Pages/UserPages/Events';

function App() {

  const router = createBrowserRouter([

    // GUEST ROUTES (NO HEADER)
    {
      element: <GuestGuard />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
      ]
    },

    // AUTHENTICATED ROUTES
    {
      element: <AuthGuard/>,
      children: [

        { path: "/", element: <HomeRedirect/> },

        {
          element: <UserLayout />,
          children: [
            {
              element: <RoleGuard allowedRoles={["user"]} />,
              children: [
                { path: "/user/dashboard", element: <Dashboard /> },
                { path: "/user/my-bookings", element: <MyBookings /> },
                { path: "/user/profile", element: <Profile /> },
                { path: "/user/events", element: <Events /> },
              ]
            }
          ]
        },

        {
          element: <AdminLayout />,
          children: [
            {
              element: <RoleGuard allowedRoles={["admin"]} />,
              children: [
                { path: "/admin/dashboard", element: <AdminDashboard /> },
                { path: "/admin/bookings", element: <AdminBookings /> },
                { path: "/admin/events", element: <AdminEvents /> },
              ]
            }
          ]
        },

        {
          path: "*",
          element: <NotFound />
        }
      ]
    },

    { path: "/unauthorized", element: <Unauthorized /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
