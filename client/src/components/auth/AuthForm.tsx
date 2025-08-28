import { Link } from "react-router-dom";

import type { AuthFormProps } from "@/types";

const AuthForm = ({ children, type, ...props }: AuthFormProps) => {
  return (
    <form className="p-8 w-fit rounded-lg grid gap-5 min-w-[30rem]" {...props}>
      {/* <p className="text-center font-semibold text-lg">
        {type === "login" ? "Login to your account" : "Create an account"}
      </p> */}
      {children}
      {/* {type === "login" ? (
        <p>
          You don't have an account?{" "}
          <Link to="/auth/signup" className="text-primary font-semibold">
            Create one.
          </Link>
        </p>
      ) : (
        <p>
          Do you have an account?{" "}
          <Link to="/auth/login" className="text-primary font-semibold">
            Log in.
          </Link>
        </p>
      )} */}
    </form>
  );
};

export default AuthForm;
