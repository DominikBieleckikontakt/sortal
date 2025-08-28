import { useState } from "react";
import type { FieldError } from "react-hook-form";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const TextField = ({ label, error, ...props }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive =
    isFocused || Boolean(props.value) || Boolean(props.defaultValue);

  return (
    <div className="relative">
      <input
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.value.length === 0 && setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={`
          block w-full bg-transparent border-0 border-b-2
          ${
            isActive
              ? "border-primary"
              : "border-foreground/10 dark:border-foreground/60"
          }
          outline-none text-sm py-2
          ${error ? "border-red-500" : ""}
        `}
        placeholder=" "
        autoComplete="off"
      />
      <label
        className={`
          absolute left-0 top-2 pointer-events-none
          transition-all duration-200
          font-light
          ${
            isActive && !error
              ? "text-primary text-xs -translate-y-5"
              : "text-foreground text-sm"
          }
              ${
                isActive && error
                  ? "text-red-500 text-xs -translate-y-5"
                  : "text-sm"
              }

        `}
      >
        {label}
      </label>
      {error && <p className="text-sm text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default TextField;
