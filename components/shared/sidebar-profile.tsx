import Image from 'next/image';
import Link from 'next/link';

import { Cover } from '@/assets/images';
import { IconBellFilled, IconBrandMessengerFilled } from '@tabler/icons-react';
import { User } from 'next-auth';
import { toast } from 'sonner';

export function SidebarProfile({ user }: { user: User }) {
  if (!user.image) return <h1>No image available</h1>;

  return (
    <div className="relative mx-auto flex w-[400px] flex-col items-center rounded-[20px] bg-zinc-800 p-4 text-white">
      <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
        <Image
          src={Cover}
          alt="Cover Image"
          className="absolute h-32 w-full rounded-xl object-cover"
          width={400}
          height={128}
        />
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
          <Image
            src={user.image}
            alt="User Avatar"
            className="h-full w-full rounded-full object-cover"
            width={87}
            height={87}
          />
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold capitalize">{user.name} 🇲🇬</h4>
        <p className="text-base text-zinc-400">@fiantsoharena</p>
      </div>
      <div className="mt-6 mb-3 flex gap-14">
        <IconBrandMessengerFilled onClick={() => toast.info('This functionality is under development.')} />
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">9.7K</p>
          <p className="text-sm text-zinc-400">Friend(s)</p>
        </div>
        <IconBellFilled onClick={() => toast.info('This functionality is under development.')} />
      </div>
    </div>
  );
}
