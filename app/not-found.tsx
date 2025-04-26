import Link from 'next/link';

import { TextGenerateEffect } from '../components/aceternity';

export default function NotFound() {
  return (
    <article className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <TextGenerateEffect words="Oay! 404 Not found" />
      <Link href="/home" className="underline">
        Go back home
      </Link>
    </article>
  );
}
