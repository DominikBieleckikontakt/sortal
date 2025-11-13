import { useState } from "react";
import { z } from "zod";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppForm } from "@/hooks/useAppForm";
import { signupSchema } from "@/types/schemas/auth";
import { authClient } from "@/lib/authClient";

import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import type { AuthErrorType } from "@/types";

type FormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [errors, setErrors] = useState<AuthErrorType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies FormData as FormData,
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.email.split("@")[0],
          image: "",
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            setIsLoading(false);
            navigate("/login");
          },
          onError: (ctx) => {
            console.log(ctx.error.status, ctx.error.message);
            setIsLoading(false);
            setErrors({ status: ctx.error.status, message: ctx.error.message });
          },
        }
      );
    },
  });

  return (
    <div className="w-full space-y-8 p-8 flex-1">
      <h3>Create an account</h3>
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

          <form.AppField name="confirmPassword">
            {(field) => (
              <field.Input label="Confirm password" type="password" />
            )}
          </form.AppField>

          <Button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer duration-300"
          >
            {isLoading && errors !== null ? "Signing up..." : "Sign up"}
          </Button>
        </FieldGroup>
      </form>
      {errors && <p className="text-red-500 font-semibold">{errors.message}</p>}
      <p className="mt-5 text-base font-light">
        Do you have an account?{" "}
        <NavLink
          to="/login"
          className="text-primary hover:text-secondary duration-300 font-semibold"
        >
          Log in.
        </NavLink>
      </p>
    </div>
  );
};

export default SignupForm;
