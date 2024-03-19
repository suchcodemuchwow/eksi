"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { createClient } from "@/lib/supabase-client";
import { Database } from "@/types/supabase";

const otpFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type OtpFormSchemaType = z.infer<typeof otpFormSchema>;

export function OtpForm({ email }: { email: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<OtpFormSchemaType>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(values: OtpFormSchemaType) {
    setIsLoading(true);
    const supabase = createClient<Database>();

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: values.pin,
      type: "email",
    });

    if (error) {
      setIsLoading(false);
      console.error(error);
      form.setError("pin", { message: "Invalid OTP" });
      return;
    }

    if (data.user) {
      router.push("/app/background");
    }
  }

  return (
    <div className={"grid gap-6"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <FormField
            control={form.control}
            name={"pin"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    render={({ slots }) => (
                      <InputOTPGroup className={"w-full justify-around"}>
                        {slots.map((s, index) => (
                          <Fragment key={index}>
                            <InputOTPSlot {...s} className={"rounded-md border"} />
                            {index !== slots.length - 1 && <InputOTPSeparator />}
                          </Fragment>
                        ))}{" "}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please enter the one-time password sent to your phone.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex w-full justify-center"}>
            <Button type={"submit"}>Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
