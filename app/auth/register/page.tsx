import Link from 'next/link';

import { TextGenerateEffect } from '@/components/aceternity';
import { RegisterForm, Social } from '@/components/shared';

import { cn } from '@/lib/utils';

export default function Register() {
  return (
    <section className={cn('flex flex-col gap-6')}>
      <div className="flex flex-col items-center gap-5">
        <TextGenerateEffect words="Register with your account to continue" />
      </div>
      <RegisterForm />
      <div className="grid grid-cols-2 gap-4">
        <Social />
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </section>
  );
}
