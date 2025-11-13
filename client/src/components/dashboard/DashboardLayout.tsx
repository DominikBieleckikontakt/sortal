import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../router/ProtectedRoute";
import LoadingTopBar from "../ui/loading-top-bar";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <>
        <LoadingTopBar />
        <main>
          <Outlet />
        </main>
      </>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
