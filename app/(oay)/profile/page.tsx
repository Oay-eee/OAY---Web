import { blogContentMock } from '@/assets/mock';

import { BlogCard } from '@/components/shared';
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import {
  FriendList,
  FriendRequest,
  Messages,
  Notifications,
  ProfileHeader,
  UserDetails,
} from '@/app/(oay)/profile/_components';

export default function Profile() {
  return (
    <main className="min-h-screen w-full p-10">
      <div className="mx-auto grid max-w-[90vw] grid-cols-[2fr_1fr]">
        <section className="scrollbar-hide mx-5 h-[calc(100vh-5rem)] space-y-8 overflow-y-auto">
          <ProfileHeader />
          <UserDetails />
          <Tabs defaultValue="posts" className="w-full">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="requests">Friend request(s)</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <section className="space-y-10 p-5 pb-30">
                {blogContentMock.map((content, index) => (
                  <BlogCard key={index} content={content} />
                ))}
              </section>
            </TabsContent>
            <TabsContent value="requests">
              <FriendRequest />
            </TabsContent>
          </Tabs>
        </section>
        <section className="space-y-5">
          <Notifications />
          <Messages />
          <FriendList />
        </section>
      </div>
    </main>
  );
}
