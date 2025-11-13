import { FormInput } from "@/components/form/FormInput";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
