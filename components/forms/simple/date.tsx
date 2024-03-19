import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FieldValues, UseFormRegister, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateInputProps<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
} & Pick<UseFormReturn<T>, "formState" | "control"> &
  Pick<ReturnType<UseFormRegister<T>>, "name">;

export function DateInput<T extends FieldValues>(props: DateInputProps<T>) {
  const { placeholder, label, control, formState, name, disabled } = props;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={"flex w-full flex-col gap-y-1"}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild disabled={disabled}>
              <Button
                variant={"outline"}
                disabled={disabled}
                className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
              >
                <CalendarIcon className={"mr-2 h-4 w-4"} />
                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent align={"start"} className={"w-full p-0"}>
              <Calendar
                mode={"single"}
                captionLayout={"dropdown"}
                selected={field.value}
                onSelect={field.onChange}
                fromYear={1900}
                toDate={new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
