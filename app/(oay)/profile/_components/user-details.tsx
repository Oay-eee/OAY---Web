import { userProfile } from '@/assets/mock';
import { IconGlobe, IconMail, IconUser } from '@tabler/icons-react';

import { Card, CardContent, CardHeader } from '@/components/ui';

export const UserDetails = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-white">User Information</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <IconUser className="h-5 w-5 text-zinc-400" />
          <span className="text-zinc-600">{userProfile.gender}</span>
        </div>
        <div className="flex items-center gap-3">
          <IconMail className="h-5 w-5 text-zinc-400" />
          <span className="text-zinc-600">{userProfile.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <IconGlobe className="h-5 w-5 text-zinc-400" />
          <span className="text-zinc-600">{userProfile.location}</span>
        </div>
      </CardContent>
    </Card>
  );
};
