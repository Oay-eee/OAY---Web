import { IconMessage2, IconUsers } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage, Card, CardContent } from '@/components/ui';

export const ProfileHeader = () => {
  const userProfile = {
    name: 'Fiantso Harena',
    username: '@fiantsoharena',
    email: 'fiantsorav@gmail.com',
    gender: 'Male',
    location: 'Antananarivo, Madagascar',
    bio: 'Passionate about making Madagascar safer and better. Sharing real-time updates about OAY situations.',
    avatar:
      'https://sm.ign.com/t/ign_fr/news/n/naruto-liv/naruto-live-action-movie-script-done-will-focus-on-how-nuanc_y3p2.1200.jpg',
    stats: {
      posts: 245,
      followers: 1234,
      following: 567,
    },
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Avatar className="h-24 w-24 border-4 border-zinc-100">
            <AvatarImage src={userProfile.avatar} className="object-cover" />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-zinc-100">{userProfile.name}</h1>
              <p className="text-zinc-500">{userProfile.username}</p>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <IconMessage2 className="h-4 w-4 text-zinc-400" />
                <span className="text-sm text-zinc-600">{userProfile.stats.posts} posts</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUsers className="h-4 w-4 text-zinc-400" />
                <span className="text-sm text-zinc-600">{userProfile.stats.followers} followers</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
