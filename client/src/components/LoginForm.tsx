import { Link } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const LoginForm = () => {
  return (
    <form className="p-8 border border-border w-fit rounded-lg shadow-sm grid gap-5">
      <p className="text-center font-semibold text-lg">
        Login to your account.
      </p>
      <div className="space-y-5">
        <div className="space-y-1">
          <Label className="font-light">Email</Label>
          <Input className="" type="email" placeholder="Input your email..." />
        </div>
        <div className="space-y-1">
          <Label className="font-light">Password</Label>
          <Input
            className=""
            type="text"
            placeholder="Input your password..."
          />
        </div>
        <Button className="w-full cursor-pointer duration-300">Log in</Button>
      </div>
      <p className="font-light">
        You don't have an account?{" "}
        <Link to="/auth/signup" className="text-primary font-semibold">
          Create one.
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
