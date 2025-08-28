import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const AuthPage = () => {
  const [tabValue, setTabValue] = useState("login");

  return (
    <main className="min-h-[100svh] bg-background w-full flex justify-center items-center">
      <Tabs
        className="max-w-[30rem] rounded-4xl"
        defaultValue="login"
        value={tabValue}
        onValueChange={setTabValue}
      >
        <TabsList className="w-full mb-5 bg-primary/10">
          <TabsTrigger value="login" className="rounded-3xl py-3 ml-1 my-1">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="rounded-3xl py-3 mr-1 my-1">
            Sign up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AuthPage;
