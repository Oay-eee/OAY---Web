'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Madagascar } from '@/assets/images';
import { useCurrentUser } from '@/hooks';
import { IconBellFilled, IconBrandMessengerFilled } from '@tabler/icons-react';
import { toast } from 'sonner';

import { P } from '@/components/ui';

export const ProfileCard = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();

  const handleNavigation = () => {
    return router.push(`/profile/${currentUser?.id}`);
  };

  if (!currentUser?.image) return <h1>No image available</h1>;

  return (
    <section className="mt-5 flex cursor-pointer flex-col items-center justify-center">
      <div className="relative mx-auto flex w-[400px] flex-col items-center rounded-[20px] bg-clip-border p-4 text-white shadow-none dark:bg-zinc-800">
        <div className="relative flex h-32 w-full justify-center rounded-xl">
          <Image
            src={Madagascar}
            className="absolute flex h-32 w-full justify-center rounded-xl object-cover"
            alt="Cover Image"
            width={1000}
            height={1000}
          />
          <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
            <Image
              className="h-full w-full rounded-full"
              src={currentUser?.image}
              alt="User Avatar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-white capitalize hover:underline" onClick={handleNavigation}>
            {currentUser?.name} 🇲🇬
          </h4>
          <P className="!mt-0 text-zinc-500">@fiantsoharena</P>
        </div>
        <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
          <Link
            href="#"
            className="flex cursor-pointer flex-col items-center justify-center"
            onClick={() => toast.info('This functionality is under development')}
          >
            <IconBrandMessengerFilled />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <p className="text-navy-700 text-2xl font-bold dark:text-white">0</p>
            <p className="text-sm font-normal text-zinc-400">Friend(s)</p>
          </div>
          <Link
            href="#"
            className="flex cursor-pointer flex-col items-center justify-center"
            onClick={() => toast.info('This functionality is under development')}
          >
            <IconBellFilled />
          </Link>
        </div>
      </div>
    </section>
  );
};
