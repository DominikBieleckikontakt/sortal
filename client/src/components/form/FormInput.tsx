import { useState } from "react";
import { Input } from "../ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "@/hooks/useAppForm";
import { Eye, EyeOff } from "lucide-react";

export const FormInput = (props: FormControlProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === "password";

  return (
    <FormBase {...props}>
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className={`${isPassword ? "pr-10" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 duration-300 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </FormBase>
  );
};
