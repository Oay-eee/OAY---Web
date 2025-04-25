import Link from "next/link";
import { cn } from "@/lib";
import { TextGenerateEffect } from "@/components/aceternity";
import { LoginForm } from "@/components/shared";

const OAUTH_ERROR_MESSAGE = "Email already in use with different provider!";

type LoginPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default function Login({ searchParams }: LoginPageProps) {
  const callbackUrl = searchParams.callbackUrl;
  const urlError = searchParams.error === "OAuthAccountNotLinked" ? OAUTH_ERROR_MESSAGE : undefined;

  return (
    <section className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-5">
        <TextGenerateEffect words="Login to your account" />
      </div>
      <LoginForm callbackUrl={callbackUrl} urlError={urlError} />
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </section>
  );
}
