import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./pages/AuthPage";

const router = createBrowserRouter([
  {
    element: <AuthPage />,
    path: "/auth",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
