import Image from 'next/image';

import { Cover } from '@/assets/images';
import { userProfile } from '@/assets/mock';
import { IconMessage2, IconUsers } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, H2, P } from '@/components/ui';

const CoverSection = ({ avatar }: { avatar: string }) => (
  <div className="relative h-32 w-full">
    <Image src={Cover} alt="Cover Image" fill className="rounded-xl object-cover" priority />
    <Avatar className="absolute -bottom-10 left-1/2 h-[90px] w-[90px] -translate-x-1/2 rounded-full border-4 border-white">
      <AvatarImage src={avatar} className="object-cover" />
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  </div>
);

const UserStats = ({ posts, followers }: { posts: number; followers: number }) => (
  <div className="flex justify-center gap-6">
    <div className="flex items-center gap-2">
      <IconMessage2 size={20} className="text-zinc-400" />
      <span className="text-sm text-zinc-400">{posts} posts</span>
    </div>
    <div className="flex items-center gap-2">
      <IconUsers size={20} className="text-zinc-400" />
      <span className="text-sm text-zinc-400">{followers} friend(s)</span>
    </div>
  </div>
);

export const ProfileHeader = () => {
  const { name, username, avatar, stats } = userProfile;

  return (
    <Card>
      <CardContent className="pb-6">
        <div className="flex flex-col items-center gap-6">
          <CoverSection avatar={avatar} />
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-center">
              <H2 className="text-2xl font-bold">{name} 🇲🇬</H2>
              <P className="text-zinc-500">{username}</P>
            </div>
            <UserStats posts={stats.posts} followers={stats.followers} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
