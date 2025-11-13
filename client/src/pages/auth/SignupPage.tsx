import SignupForm from "@/components/auth/SignupForm";
import SignupTexts from "@/components/auth/SignupTexts";

const SignupPage = () => {
  return (
    <div className="w-full max-w-[60rem] flex rounded-lg shadow-sm border border-foreground/5">
      <SignupTexts />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
