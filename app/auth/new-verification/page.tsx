"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { newVerificationAction } from "@/actions";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";
import { FormError, FormSuccess, Social } from "@/components/shared";

export default function NewVerification() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerificationAction(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    setIsMounted(true);
    onSubmit();
  }, [onSubmit]);

  const loaderColor = theme === "dark" ? "white" : "black";

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {isMounted && !success && !error && <BeatLoader color={loaderColor} />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
      <div className="mt-10 text-center text-sm">
        Go back to{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login page
        </Link>
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Social />
      </div>
    </div>
  );
}
