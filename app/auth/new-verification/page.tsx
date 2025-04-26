import Link from 'next/link';

import { newVerificationAction } from '@/actions';

import { TextGenerateEffect } from '@/components/aceternity';
import { VerificationResult } from '@/components/shared';

import { cn } from '@/lib/utils';

type VerificationPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function NewVerification({ searchParams }: VerificationPageProps) {
  const token = searchParams.token;

  let verificationResult: { success?: string; error?: string } = { error: 'Missing token!' };
  if (token) {
    try {
      verificationResult = await newVerificationAction(token);
    } catch {
      verificationResult = { error: 'Something went wrong!' };
    }
  }

  return (
    <section className={cn('flex w-full flex-col items-center justify-center gap-6')}>
      <div className="flex flex-col items-center gap-5 text-center">
        <TextGenerateEffect words="Verification result" />
      </div>
      <VerificationResult success={verificationResult.success} error={verificationResult.error} />
      <div className="mt-10 text-center text-sm">
        Go back to{' '}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login page
        </Link>
      </div>
    </section>
  );
}
