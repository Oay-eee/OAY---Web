import Link from "next/link";
import { TextGenerateEffect } from "@/components/aceternity";
import { ResetForm } from "@/components/shared/reset-form";
import { cn } from "@/lib/utils";

export default function Reset() {
  return (
    <section className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-5">
        <TextGenerateEffect words="Reset your password" />
      </div>
      <ResetForm />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </section>
  );
}
