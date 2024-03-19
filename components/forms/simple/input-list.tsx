import { MinusCircle, PlusCircle } from "lucide-react";
import React from "react";
import { ArrayPath, FieldValues, useFieldArray, UseFormRegister, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextareaAutoHeight } from "@/components/ui/textarea-autosize";
import { cn } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  className?: string;
} & Pick<UseFormReturn<T>, "formState" | "control"> &
  Pick<ReturnType<UseFormRegister<T>>, "name"> &
  React.InputHTMLAttributes<HTMLInputElement>;

export function FormInputList<T extends FieldValues>(props: FormInputProps<T>) {
  const { placeholder: placeholderProp, label, control, className, disabled, name, type } = props;

  const { fields, remove, append } = useFieldArray<T>({
    name: name as ArrayPath<T>,
    control,
  });

  // @ts-ignore
  const onAdd = () => append({ text: "" });
  const placeholder = placeholderProp ?? `Enter your ${label.toLowerCase()}`;

  return (
    <div className={cn("flex flex-col gap-y-3", className)}>
      <Label>{label}</Label>
      <div className={"flex flex-col gap-y-2"}>
        {fields.map((f, i) => (
          <FormField
            disabled={disabled}
            control={control}
            name={`${name}.${i}.text` as any}
            key={f.id}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={"flex items-start gap-2"}>
                    <Button variant={"icon"} size={"icon"} onClick={() => remove(i)} disabled={disabled}>
                      <MinusCircle size={20} />
                    </Button>
                    <div className={"w-full space-y-2"}>
                      <Input {...field} placeholder={placeholder} disabled={disabled} />
                      <FormMessage />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button variant={"icon"} size={"icon"} onClick={onAdd} disabled={disabled} className={"self-start"}>
          <PlusCircle size={20} />
        </Button>
      </div>
    </div>
  );
}
