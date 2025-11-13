import { Outlet } from "react-router-dom";
import LoadingTopBar from "../ui/loading-top-bar";
import { GuestRoute } from "@/router/GuestRoute";

const AuthLayout = () => {
  return (
    <GuestRoute>
      <main className="min-h-svh bg-background w-full flex justify-center items-center">
        <LoadingTopBar />
        <Outlet />
      </main>
    </GuestRoute>
  );
};

export default AuthLayout;
