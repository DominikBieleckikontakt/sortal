import {createBrowserRouter}  from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import AuthLayout from "../components/auth/AuthLayout";
import DashboardPage from "../pages/dashboard";
import ProtectedLayout from "../components/dashboard/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;