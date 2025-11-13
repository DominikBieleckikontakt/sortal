import LoginForm from "@/components/auth/LoginForm";
import LoginTexts from "@/components/auth/LoginTexts";

const LoginPage = () => {
  return (
    <div className="w-full max-w-[60rem] flex rounded-lg shadow-sm border border-foreground/5">
      <LoginTexts />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
