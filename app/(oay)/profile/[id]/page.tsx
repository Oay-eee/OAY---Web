'use client';

import { FC, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { blogContentMock } from '@/assets/mock';
import { getUserById } from '@/data';
import { useCurrentUser } from '@/hooks';
import { Gender } from '@prisma/client';
import { ClipLoader } from 'react-spinners';

import { TextGenerateEffect } from '@/components/aceternity';
import { BlogCard } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';

import {
  FriendList,
  FriendRequest,
  Messages,
  Notifications,
  ProfileHeader,
  UserDetails,
} from '@/app/(oay)/profile/[id]/_components';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  pseudo: string | null;
  image: string | null;
  gender: Gender | null;
  roles: string;
  points: number;
  createdAt: Date;
  isTwoFactorEnabled: boolean;
};

type UserProfileData = {
  name: string;
  username: string;
  avatar: string;
};

type ProfileSectionProps = {
  blogContent: typeof blogContentMock;
  userInfo: User | null;
};

const getUserProfileData = (userInfo: User | null): UserProfileData => ({
  name: userInfo?.name || 'Anonymous',
  username: userInfo?.pseudo || userInfo?.email?.split('@')[0] || 'user',
  avatar: userInfo?.image || '/images/default-avatar.png',
});

const ProfileSection: FC<ProfileSectionProps> = ({ blogContent, userInfo }) => {
  const currentUser = useCurrentUser();

  const userData = useMemo(() => getUserProfileData(userInfo), [userInfo]);

  if (!currentUser?.id) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <section className="scrollbar-hide mx-5 h-[calc(100vh-5rem)] space-y-8 overflow-y-auto">
      <ProfileHeader {...userData} stats={{ posts: 0, followers: 0 }} />
      <UserDetails />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="list">Friend list</TabsTrigger>
          <TabsTrigger value="requests">Friend request(s)</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <section className="space-y-10 p-5 pb-20">
            {blogContent.map((content) => (
              <BlogCard key={content.id} content={content} />
            ))}
          </section>
        </TabsContent>
        <TabsContent value="requests">
          <FriendRequest currentUserId={currentUser.id} />
        </TabsContent>
        <TabsContent value="list">
          <FriendList />
        </TabsContent>
      </Tabs>
    </section>
  );
};

const SidebarSection = () => (
  <section className="scrollbar-hide mx-5 h-[calc(100vh-5rem)] space-y-5 overflow-y-auto">
    <Notifications />
    <Messages />
  </section>
);

export default function Profile() {
  const pathname = usePathname();
  const userId = pathname.split('/')[2];
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getUserById(userId);
        setUserData(result);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      );
    }

    if (!userData) {
      return (
        <article className="flex w-full flex-col items-center justify-center gap-10">
          <TextGenerateEffect words="User not found :')" />
          <Link href="/home" className="underline">
            Go back home
          </Link>
        </article>
      );
    }

    return <ProfileSection userInfo={userData} blogContent={blogContentMock} />;
  };

  return (
    <main className="min-h-screen w-full p-10">
      <div className="mx-auto grid max-w-[90vw] grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
        {renderContent()}
        <SidebarSection />
      </div>
    </main>
  );
}
