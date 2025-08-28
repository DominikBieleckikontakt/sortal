import { Outlet } from "react-router-dom";

const AuthRoot = () => {
  return (
    <main className="min-h-[100svh] bg-background w-full flex justify-center items-center">
      <Outlet />
    </main>
  );
};

export default AuthRoot;
