import { ElementType } from 'react';

import { useCurrentUser } from '@/hooks';
import { IconEdit, IconGlobe, IconMail, IconUser } from '@tabler/icons-react';

import { Button, Card, CardContent, CardHeader, H2 } from '@/components/ui';

type UserInfoItemProps = {
  icon: ElementType;
  label: string;
};

type UserDetailsProps = {
  userId: string;
  gender: string;
  email: string;
  location: string;
};

const UserInfoItem = ({ icon: Icon, label }: UserInfoItemProps) => (
  <div className="flex items-center gap-3">
    <Icon size={20} className="text-zinc-400" />
    <span className="text-sm text-zinc-400">{label}</span>
  </div>
);

export const UserDetails = ({ userId, gender, email, location }: UserDetailsProps) => {
  const currentUser = useCurrentUser();
  const isOwnProfile = currentUser?.id === userId;

  return (
    <Card>
      <CardHeader className="flex justify-between pb-4">
        <H2 className="text-xl">User Information</H2>
        {isOwnProfile && (
          <Button className="flex cursor-pointer items-center gap-2 rounded-full">
            <IconEdit /> Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <UserInfoItem icon={IconUser} label={gender} />
        <UserInfoItem icon={IconMail} label={email} />
        <UserInfoItem icon={IconGlobe} label={location} />
      </CardContent>
    </Card>
  );
};
