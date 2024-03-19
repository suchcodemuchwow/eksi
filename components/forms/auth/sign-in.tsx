"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormInput } from "@/components/forms/simple/input";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createClient } from "@/lib/supabase-client";

const emailMagicLinkSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type EmailMagicLinkFormValues = z.infer<typeof emailMagicLinkSchema>;

export function AuthForm({ setEmail }: { setEmail: (email: string) => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authMethod, setAuthMethod] = useState<"email" | "google" | null>(null);
  const form = useForm<EmailMagicLinkFormValues>({
    resolver: zodResolver(emailMagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: EmailMagicLinkFormValues) {
    setIsLoading(true);
    setAuthMethod("email");

    console.log("Email", values.email);

    const { error, data } = await createClient().auth.signInWithOtp({
      email: values.email,
    });

    if (error) {
      console.error(error);
      return;
    }

    setIsLoading(false);
    setAuthMethod(null);

    setEmail(values.email);
  }

  return (
    <div className={"grid gap-6"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <FormInput label={"Email"} name={"email"} formState={form.formState} control={form.control} />
          <Button type={"submit"} disabled={isLoading} className={"w-full"}>
            {isLoading && authMethod === "email" && <Loader2Icon className={"mr-2 h-4 w-4 animate-spin"} />}
            Sign In with Email
          </Button>
        </form>
        <div className={"relative"}>
          <div className={"absolute inset-0 flex items-center"}>
            <span className={"w-full border-t"} />
          </div>
          <div className={"relative flex justify-center text-xs uppercase"}>
            <span className={"bg-background px-2 text-muted-foreground"}>Or continue with</span>
          </div>
        </div>
        <Button type={"button"} variant={"outline"} disabled={isLoading}>
          {isLoading && authMethod === "google" ? (
            <Icons.spinner className={"mr-2 h-4 w-4 animate-spin"} />
          ) : (
            <Icons.google className={"mr-2 h-4 w-4"} />
          )}{" "}
          Sign In with Google
        </Button>
      </Form>
    </div>
  );
}
