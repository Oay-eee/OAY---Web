'use client';

import { useEffect, useState } from 'react';

import { StaticImageData } from 'next/image';

import { blogContentMock } from '@/assets/mock';
import { getUserById } from '@/data';
import { useCurrentUser } from '@/hooks';
import { Gender } from '@prisma/client';
import { ClipLoader } from 'react-spinners';

import { BlogCard } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import { FriendRequest, Messages, Notifications, ProfileHeader, UserDetails } from '@/app/(oay)/profile/_components';

export type BlogContent = {
  slug: string;
  author: string;
  date: string;
  title: string;
  description: string;
  image: StaticImageData;
};

type UserData = {
  name: string | null;
  id: string;
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
} | null;

const ProfileSection = ({ blogContent }: { blogContent: BlogContent[] }) => {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<UserData | null>(null);

  const userData = {
    name: user?.name || 'Anonymous',
    username: user?.pseudo || user?.email?.split('@')[0] || 'user',
    avatar: user?.image || '/images/default-avatar.png',
  };

  useEffect(() => {
    if (currentUser?.id) {
      (async () => {
        const profileData = await getUserById(currentUser.id);
        setUser(profileData);
      })();
    }
  }, [currentUser]);

  if (!currentUser?.id) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <section className="scrollbar-hide mx-5 h-[calc(100vh-5rem)] space-y-8 overflow-y-auto">
      <ProfileHeader
        {...userData}
        stats={{
          posts: 0,
          followers: 0,
        }}
      />
      <UserDetails />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="requests">Friend request(s)</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <section className="space-y-10 p-5 pb-20">
            {blogContent.map((content) => (
              <BlogCard key={content.slug} content={content} />
            ))}
          </section>
        </TabsContent>

        <TabsContent value="requests">
          <FriendRequest currentUserId={currentUser.id} />
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
  return (
    <main className="min-h-screen w-full p-10">
      <div className="mx-auto grid max-w-[90vw] grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
        <ProfileSection blogContent={blogContentMock} />
        <SidebarSection />
      </div>
    </main>
  );
}
