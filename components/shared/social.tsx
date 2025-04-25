"use client";

import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = async (provider: "google" | "github") => {
    await signIn(provider, {
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <>
      <Button variant="outline" className="w-full cursor-pointer" onClick={() => onClick("github")}>
        <IconBrandGithub />
        <span className="sr-only">Login with Github</span>
      </Button>
      <Button variant="outline" className="w-full cursor-pointer" onClick={() => onClick("google")}>
        <IconBrandGoogle />
        <span className="sr-only">Login with Google</span>
      </Button>
    </>
  );
};
