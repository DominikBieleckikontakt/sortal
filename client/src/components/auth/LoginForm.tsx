import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  return (
    <AuthForm type="login">
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
    </AuthForm>
  );
};

export default LoginForm;
