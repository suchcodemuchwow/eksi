import React from "react";
import { FieldValues, UseFormRegister, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type FormInputProps<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  className?: string;
} & Pick<UseFormReturn<T>, "formState" | "control"> &
  Pick<ReturnType<UseFormRegister<T>>, "name"> &
  React.InputHTMLAttributes<HTMLInputElement>;

export function FormTextArea<T extends FieldValues>(props: FormInputProps<T>) {
  const { placeholder, label, className, control, formState, name, type, disabled } = props;

  return (
    <FormField
      control={control}
      name={name!}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} disabled={disabled} placeholder={placeholder ?? `Enter your ${label.toLowerCase()}`} />
          </FormControl>
          {formState!.errors[`${name}`] && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
