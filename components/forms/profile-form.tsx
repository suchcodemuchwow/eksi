"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormInput } from "@/components/forms/simple/input";
import { FormInputList } from "@/components/forms/simple/input-list";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tables } from "@/types/supabase";

import { Card, CardContent } from "../ui/card";

export type ProfileDbSchemaWithOptionals = Omit<Tables<"profile">, "id" | "userId" | "createdAt" | "updatedAt">;

const contactFormSchema = z.object({
  firstname: z.string().min(1, "Please enter your first name."),
  lastname: z.string().min(1, "Please enter your last name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  headline: z.string().min(10, "Headline must be at least 10 characters long.").max(280, "Headline must be at most 280 characters long."),
  links: z.array(
    z.object({
      text: z.string().url({ message: "Please enter a valid URL." }),
    }),
  ),
});

export type BasicInfoFormProps = {
  profile?: ProfileDbSchemaWithOptionals;
  onSave: (profile: ProfileDbSchemaWithOptionals) => void;
  onDiscard: () => void;
};

const getDefaultValues = (basicInfo?: ProfileDbSchemaWithOptionals) => {
  return {
    firstname: basicInfo?.firstname ?? "",
    lastname: basicInfo?.lastname ?? "",
    email: basicInfo?.email ?? "",
    phone: basicInfo?.phone ?? "",
    headline: basicInfo?.headline ?? "",
    links: basicInfo?.links.map((text) => ({ text })),
  };
};

export function ProfileForm(props: BasicInfoFormProps) {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: getDefaultValues(props.profile),
    mode: "onTouched",
  });

  const onPressSave = () => {
    const { links, ...rest } = form.getValues();
    console.log("onPressSave", rest, links);

    props.onSave({
      links: links.filter((e) => e.text.length > 3).map(({ text }) => text),
      ...rest,
    });
  };

  return (
    <Card>
      <CardContent className={"py-4"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onPressSave)} className={"grid grid-cols-2 gap-4"}>
            <FormInput name={`firstname`} label={"First Name"} control={form.control} formState={form.formState} />
            <FormInput name={`lastname`} label={"Last Name"} control={form.control} formState={form.formState} />
            <FormInput name={`email`} label={"Email"} control={form.control} formState={form.formState} />
            <FormInput name={`phone`} label={"Phone"} type={"tel"} control={form.control} formState={form.formState} />
            <FormInput name={`headline`} label={"Headline"} control={form.control} formState={form.formState} className={"col-span-2"} />
            <FormInputList
              name={`links`}
              label={"Links"}
              type={"url"}
              control={form.control}
              formState={form.formState}
              placeholder={"Link to your website, blog, or social media profile."}
              className={"col-span-2"}
            />
            <div className={"col-span-2 flex justify-end space-x-2"}>
              <Button size={"lg"} variant={"outline"} onClick={props.onDiscard}>
                Discard
              </Button>
              <Button size={"lg"} type={"submit"}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
