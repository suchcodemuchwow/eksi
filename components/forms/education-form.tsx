"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Optional } from "utility-types";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { generateEmptyEducation } from "@/lib/utils";
import { Tables } from "@/types/supabase";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DateInput } from "./simple/date";
import { FormInput } from "./simple/input";
import { FormInputList } from "./simple/input-list";

export type EducationDbSchemaWithOptionals = Optional<Tables<"education">, "createdAt" | "updatedAt" | "userId">;

export type EducationSectionProps = {
  educations?: EducationDbSchemaWithOptionals[] | null;
};

export type PositionFormProps = {
  education: EducationDbSchemaWithOptionals;
  onDiscard: (id: string) => void;
  onSave: (position: EducationDbSchemaWithOptionals) => Promise<void>;
};

const educationSchema = z.object({
  id: z.string().optional(),
  degree: z.string(),
  field: z.string().min(2, "Field must be at least 2 characters long"),
  institution: z.string(),
  startDate: z.date().min(new Date(1950, 1, 1), "Start date must be after 1900"),
  endDate: z.date().max(new Date(), "Start date must be after 1900"),
  notes: z.array(
    z.object({
      text: z.string().min(3, "Note must be at least 3 characters long"),
    }),
  ),
});

type EducationSchema = z.infer<typeof educationSchema>;

function parseEducation(education: EducationDbSchemaWithOptionals) {
  return {
    ...education,
    notes: education.notes ? education.notes.map((note) => ({ text: note })) : [{ text: "" }],
    startDate: new Date(education.startDate ?? ""),
    endDate: new Date(education.endDate ?? ""),
  };
}

function getDefaults(education: EducationDbSchemaWithOptionals) {
  return education ? parseEducation(education) : parseEducation(generateEmptyEducation());
}

export function EducationForm(props: PositionFormProps) {
  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: getDefaults(props.education),
  });

  const onSubmit = async () => {
    try {
      await props.onSave({
        id: props.education.id,
        degree: form.getValues("degree"),
        field: form.getValues("field"),
        institution: form.getValues("institution"),
        startDate: form.getValues("startDate").toISOString(),
        endDate: form.getValues("endDate").toISOString(),
        notes: form.getValues("notes").map((note) => note.text),
      });
    } catch (e) {}
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className={"grid grid-cols-2 gap-4 py-4"}>
            <FormInput
              name={"institution"}
              label={"institution"}
              placeholder={"University of California, Berkeley"}
              control={form.control}
              formState={form.formState}
            />
            <FormInput
              name={"degree"}
              label={"Degree"}
              placeholder={"B.S., M.S., etc."}
              control={form.control}
              formState={form.formState}
            />
            <FormInput
              name={"field"}
              label={"Field of Study"}
              className={"col-span-2"}
              placeholder={"Computer Science, Business, etc."}
              control={form.control}
              formState={form.formState}
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
              <Button size={"lg"} variant={"outline"} onClick={() => props.onDiscard(props.education.id)}>
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

//  <FormTextArea
//   name={`positions.${index}.jobPostingOrContract`}
//   className={"col-span-2"}
//   disabled={!isEditing}
//   label="Job Posting or Contract (optional)"
//   placeholder={
//     "Please enter job posting description or contract " +
//     "details about responsibilities to feed AI with " +
//     "extra context so it can generate better resume for you."
//   }
//   control={form.control}
//   formState={form.formState}
// />

// <CardFooter className={"hidden justify-end group-hover:flex"}>
//   <Button type="button" size={"sm"}>
//     Save
//   </Button>
// </CardFooter>
