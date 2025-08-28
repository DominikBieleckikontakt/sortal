import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRoot from "./components/auth/AuthRoot";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    element: <AuthRoot />,
    path: "/auth",
    children: [
      {
        element: <LoginPage />,
        path: "login",
      },
      {
        element: <SignupPage />,
        path: "signup",
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
