"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { loginAction } from "@/actions";
import { cn } from "@/lib";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError, FormSuccess } from "@/components/shared";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";

type LoginFormProps = {
  callbackUrl?: string;
  urlError?: string;
};

export const LoginForm = ({ callbackUrl, urlError }: LoginFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      loginAction(values, callbackUrl)
        .then((data) => {
          if ("error" in data) {
            form.reset();
            setError(data.error);
          }
          if ("success" in data) {
            form.reset();
            setSuccess(data.success);
          }
          if ("twoFactor" in data) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("An unexpected error occurred"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("grid gap-6")} noValidate>
        {showTwoFactor ? (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two-Factor Code</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="123456" autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/auth/reset" className="text-sm underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full cursor-pointer">
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
        <div className="relative text-center text-sm">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
          <div className="after:border-border absolute inset-0 top-1/2 z-0 border-t" />
        </div>
      </form>
    </Form>
  );
};
