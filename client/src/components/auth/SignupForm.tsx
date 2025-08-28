import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { SignupFormData } from "@/types";
import { signupSchema } from "@/types/schemas/auth";

import AuthForm from "./AuthForm";

import { Button } from "../ui/button";
import InputGroup from "./InputGroup";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { email, password } = data;

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || errorData.error || "Something went wrong"
        );
      } else {
        console.log("Signuped successfully");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm type="signup" onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <div className="loader mx-auto my-10" />
      ) : (
        <div className="space-y-5">
          <InputGroup
            label="Email"
            errorObject={errors.email}
            {...register("email")}
            placeholder="Input your email..."
            type="email"
          />
          <InputGroup
            label="Password"
            errorObject={errors.password}
            {...register("password")}
            placeholder="Input your password..."
            type="password"
          />
          <InputGroup
            label="Confirm password"
            errorObject={errors.confirmPassword}
            {...register("confirmPassword")}
            placeholder="Confirm your password..."
            type="password"
          />
          {error && <p className="text-destructive font-semibold">{error}</p>}
          <Button
            className="w-full cursor-pointer duration-300"
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            Sign up
          </Button>
        </div>
      )}
    </AuthForm>
  );
};

export default SignupForm;
