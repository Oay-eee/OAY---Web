import Link from "next/link";
import { newVerificationAction } from "@/actions";
import { Social, VerificationResult } from "@/components/shared";
import { cn } from "@/lib/utils";

type VerificationPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function NewVerification({ searchParams }: VerificationPageProps) {
  const token = searchParams.token;

  let verificationResult: { success?: string; error?: string } = { error: "Missing token!" };
  if (token) {
    try {
      verificationResult = await newVerificationAction(token);
    } catch {
      verificationResult = { error: "Something went wrong!" };
    }
  }

  return (
    <section className={cn("flex w-full flex-col items-center justify-center gap-6")}>
      <VerificationResult success={verificationResult.success} error={verificationResult.error} />
      <div className="mt-10 text-center text-sm">
        Go back to{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login page
        </Link>
      </div>
      <div className="relative text-center text-sm">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
        <div className="after:border-border absolute inset-0 top-1/2 z-0 border-t" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Social />
      </div>
    </section>
  );
}
