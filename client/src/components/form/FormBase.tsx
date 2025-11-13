import type { ReactNode } from "react";
import {
  FieldLabel,
  FieldDescription,
  FieldError,
  Field,
  FieldContent,
} from "../ui/field";
import { useFieldContext } from "@/hooks/useAppForm";

export type FormControlProps = {
  label: string;
  description?: string;
  type?: string;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
};

export const FormBase = ({
  children,
  label,
  description,
  horizontal,
  controlFirst,
}: FormBaseProps) => {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );

  const errorElem = isInvalid && (
    // <FieldError errors={field.state.meta.errors} />
    <p>{field.state.meta.errors[0].message}</p>
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  );
};
