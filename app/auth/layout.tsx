import { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Madagascar } from '@/assets/images';
import { IconAlertSquareRoundedFilled } from '@tabler/icons-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
            <IconAlertSquareRoundedFilled className="h-6 w-6" />
            OAY
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src={Madagascar}
          alt="Madagascar"
          width={2048}
          height={2048}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </main>
  );
}
