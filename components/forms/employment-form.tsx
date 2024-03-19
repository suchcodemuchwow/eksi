"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Optional } from "utility-types";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { generateEmptyPosition } from "@/lib/utils";
import { Tables } from "@/types/supabase";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DateInput } from "./simple/date";
import { FormInput } from "./simple/input";
import { FormInputList } from "./simple/input-list";

export type EmploymentDbSchemaWithOptionals = Optional<Tables<"employment">, "createdAt" | "updatedAt" | "userId">;

export type EmploymentSectionProps = {
  positions?: EmploymentDbSchemaWithOptionals[] | null;
};

export type PositionFormProps = {
  position: EmploymentDbSchemaWithOptionals;
  onDiscard: (id: string) => void;
  onSave: (position: EmploymentDbSchemaWithOptionals) => Promise<void>;
};

const positionSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  company: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  notes: z.array(z.object({ text: z.string() })),
});

type PositionForm = z.infer<typeof positionSchema>;

function parsePosition(position: EmploymentDbSchemaWithOptionals) {
  return {
    ...position,
    notes: position.notes ? position.notes.map((note) => ({ text: note })) : [{ text: "" }],
    startDate: new Date(position.startDate ?? ""),
    endDate: new Date(position.endDate ?? ""),
  };
}

function getDefaults(position: EmploymentDbSchemaWithOptionals) {
  return position ? parsePosition(position) : parsePosition(generateEmptyPosition());
}

export function PositionForm(props: PositionFormProps) {
  const form = useForm<PositionForm>({
    resolver: zodResolver(positionSchema),
    defaultValues: getDefaults(props.position),
  });

  const onSubmit = async () => {
    await props.onSave({
      id: props.position.id,
      title: form.getValues("title"),
      company: form.getValues("company"),
      startDate: form.getValues("startDate").toISOString(),
      endDate: form.getValues("endDate").toISOString(),
      notes: form.getValues("notes").map((note) => note.text),
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className={"col-span-2 grid grid-cols-2 gap-4 py-4"}>
            <FormInput
              name={"company"}
              label={"Company"}
              control={form.control}
              formState={form.formState}
              placeholder={"Enter the company you held"}
            />
            <FormInput
              name={"title"}
              label={"Title"}
              control={form.control}
              formState={form.formState}
              placeholder={"Enter the position you held"}
            />
            <DateInput name={"startDate"} label={"Start Date"} control={form.control} formState={form.formState} />
            <DateInput name={"endDate"} label={"End Date"} control={form.control} formState={form.formState} />
            <FormInputList
              name={"notes"}
              label={"Notes"}
              className={"col-span-2"}
              control={form.control}
              formState={form.formState}
              placeholder={"Achievements, responsibilities, etc."}
            />
            <div className={"col-span-2 flex justify-end space-x-2"}>
              <Button size={"lg"} variant={"outline"} onClick={() => props.onDiscard(props.position.id)}>
                Discard
              </Button>
              <Button size={"lg"} type={"submit"}>
                Save
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
