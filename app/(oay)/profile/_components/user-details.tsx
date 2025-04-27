import { ElementType } from 'react';

import { userProfile } from '@/assets/mock';
import { IconGlobe, IconMail, IconUser } from '@tabler/icons-react';

import { Card, CardContent, CardHeader, H2 } from '@/components/ui';

type UserInfoItemProps = {
  icon: ElementType;
  label: string;
};

const UserInfoItem = ({ icon: Icon, label }: UserInfoItemProps) => (
  <div className="flex items-center gap-3">
    <Icon size={20} className="text-zinc-400" />
    <span className="text-sm text-zinc-400">{label}</span>
  </div>
);

export const UserDetails = () => {
  const { gender, email, location } = userProfile;

  return (
    <Card>
      <CardHeader className="pb-4">
        <H2 className="text-xl">User Information</H2>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserInfoItem icon={IconUser} label={gender} />
        <UserInfoItem icon={IconMail} label={email} />
        <UserInfoItem icon={IconGlobe} label={location} />
      </CardContent>
    </Card>
  );
};
