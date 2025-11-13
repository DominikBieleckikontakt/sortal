import { LOGIN_TEXTS } from "@/consts";
import { CheckCircle } from "lucide-react";

const LoginTexts = () => {
  return (
    <div className="space-y-8 p-8 bg-linear-to-br from-primary to-secondary rounded-l-lg text-white flex-1">
      <div className="space-y-5">
        <p className="uppercase text-background/60 font-light">
          Login to your account
        </p>
        <h2>Get access to your favorite platform</h2>
      </div>
      <div className="space-y-3">
        {LOGIN_TEXTS.map((text, index) => (
          <div key={text + index} className="flex gap-2">
            <CheckCircle />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div>
        <h4 className="bg-foreground/25 rounded-lg p-3">
          Don't wait! Get started now!
        </h4>
      </div>
    </div>
  );
};

export default LoginTexts;
