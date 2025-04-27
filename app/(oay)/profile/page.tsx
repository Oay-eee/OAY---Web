import { StaticImageData } from 'next/image';

import { blogContentMock } from '@/assets/mock';

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

const ProfileSection = ({ blogContent }: { blogContent: BlogContent[] }) => (
  <section className="scrollbar-hide mx-5 h-[calc(100vh-5rem)] space-y-8 overflow-y-auto">
    <ProfileHeader />
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
        <FriendRequest />
      </TabsContent>
    </Tabs>
  </section>
);

const SidebarSection = () => (
  <section className="scrollbar-hide mx-5 h-[calc(100vh-5rem)] space-y-5 overflow-y-auto">
    <Notifications />
    <Messages />
  </section>
);

export default function Profile() {
  return (
    <main className="min-h-screen w-full p-10">
      <div className="mx-auto grid max-w-[90vw] grid-cols-[2fr_1fr] gap-5">
        <ProfileSection blogContent={blogContentMock} />
        <SidebarSection />
      </div>
    </main>
  );
}
