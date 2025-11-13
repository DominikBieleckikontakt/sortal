import { SIGNUP_TEXTS } from "@/consts";
import { CheckCircle } from "lucide-react";

const SignupTexts = () => {
  return (
    <div className="flex flex-col justify-between p-8 bg-linear-to-br from-secondary to-primary rounded-l-lg text-white flex-1">
      <div className="space-y-8">
        <div className="space-y-5">
          <p className="uppercase text-background/60 font-light tracking-wider">
            Create your account
          </p>
          <h2>Get access to your favorite platform</h2>
        </div>
        <div className="space-y-3">
          {SIGNUP_TEXTS.map((text, index) => (
            <div key={text + index} className="flex gap-2">
              <CheckCircle />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="bg-foreground/25 rounded-lg p-3">
          Don't wait! Get started now!
        </h4>
      </div>
    </div>
  );
};

export default SignupTexts;
