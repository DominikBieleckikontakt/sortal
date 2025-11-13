import type z from "zod";

import type { signupSchema } from "./schemas/auth";
import type { FormHTMLAttributes } from "react";
import type { Input } from "@/components/ui/input";
import type { FieldError } from "react-hook-form";

export type SignupFormData = z.infer<typeof signupSchema>;

export interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  type: "login" | "signup";
}

export type InputGroupProps = React.ComponentProps<typeof Input> & {
  label: string;
  errorObject: FieldError | undefined;
};

export type AuthErrorType = {
  status: number;
  message: string;
};
