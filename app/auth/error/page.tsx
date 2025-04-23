import Link from "next/link";
import { IconExclamationMark } from "@tabler/icons-react";

export default function AuthErrorPage() {
  return (
    <article>
      <div className="bg-destructive/15 text-destructive flex w-full items-center justify-center gap-x-2 rounded-md p-3 text-sm">
        <IconExclamationMark className="h4 w-4" />
        <p>There is an authentication error</p>
      </div>
      <div className="mt-10 text-center text-sm">
        Go back to{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login page
        </Link>
      </div>
    </article>
  );
}
