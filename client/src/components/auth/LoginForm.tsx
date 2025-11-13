import { useAppForm } from "@/hooks/useAppForm";
import { loginSchema } from "@/types/schemas/auth";
import { z } from "zod";
import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/authClient";
import { useState } from "react";
import type { AuthErrorType } from "@/types";

type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [errors, setErrors] = useState<AuthErrorType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies FormData as FormData,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            setIsLoading(false);
            navigate("/dashboard");
          },
          onError: (ctx) => {
            setIsLoading(false);
            setErrors({ status: ctx.error.status, message: ctx.error.message });
          },
        }
      );
    },
  });

  return (
    <div className="w-full gap-8 flex flex-col justify-between p-8 flex-1">
      <h3>Login</h3>
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField name="email">
            {(field) => <field.Input label="Email" type="email" />}
          </form.AppField>

          <form.AppField name="password">
            {(field) => <field.Input label="Password" type="password" />}
          </form.AppField>

          <Button type="submit" className="cursor-pointer duration-300">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </FieldGroup>
      </form>
      {errors && <p className="text-red-500 font-semibold">{errors.message}</p>}
      <p className="text-base font-light">
        Don't have an account?{" "}
        <NavLink
          to="/signup"
          className="text-primary hover:text-secondary duration-300 font-semibold"
        >
          Create a new one.
        </NavLink>
      </p>
    </div>
  );
};

export default LoginForm;
