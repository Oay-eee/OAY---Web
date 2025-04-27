import Image from 'next/image';

import { Cover } from '@/assets/images';
import { userProfile } from '@/assets/mock';
import { IconMessage2, IconUsers } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage, Card, CardContent } from '@/components/ui';

export const ProfileHeader = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <Image
              src={Cover}
              className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              alt="Cover Image"
              width={200}
              height={200}
            />
            <Avatar className="border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
              <AvatarImage src={userProfile.avatar} className="object-cover" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-10 flex-1 space-y-4">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl font-bold text-zinc-100">{userProfile.name} 🇲🇬</h1>
              <p className="text-sm text-zinc-500">{userProfile.username}</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <IconMessage2 className="h-4 w-4 text-zinc-400" />
                <span className="text-sm text-zinc-600">{userProfile.stats.posts} posts</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUsers className="h-4 w-4 text-zinc-400" />
                <span className="text-sm text-zinc-600">{userProfile.stats.followers} friend(s)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
