"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui";

export const Social = () => {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = async (provider: "google" | "github") => {
    setLoadingProvider(provider);
    await signIn(provider, {
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => onClick("github")}
        disabled={!!loadingProvider}
      >
        {loadingProvider === "github" ? (
          <ClipLoader size={20} color="white" />
        ) : (
          <IconBrandGithub />
        )}
      </Button>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => onClick("google")}
        disabled={!!loadingProvider}
      >
        {loadingProvider === "google" ? (
          <ClipLoader size={20} color="white" />
        ) : (
          <IconBrandGoogle />
        )}
      </Button>
    </>
  );
};
