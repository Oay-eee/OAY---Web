import Link from 'next/link';

import { IconExclamationMark } from '@tabler/icons-react';

import { TextGenerateEffect } from '@/components/aceternity';

export default function AuthErrorPage() {
  return (
    <article>
      <div className="mb-10 flex flex-col items-center gap-5 text-center">
        <TextGenerateEffect words="Error :')" />
      </div>
      <div className="bg-destructive/15 text-destructive flex w-full items-center justify-center gap-x-2 rounded-md p-3 text-sm">
        <IconExclamationMark className="h4 w-4" />
        <p>There is an authentication error</p>
      </div>
      <div className="mt-10 text-center text-sm">
        Go back to{' '}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login page
        </Link>
      </div>
    </article>
  );
}
