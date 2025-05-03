import { blogContentMock } from '@/assets/mock';

import { BlogCard, ProfileCard } from '@/components/shared';

import { DiscoverSection, Header, SearchInput, SuggestedFriends } from '@/app/(oay)/home/_components';

export default function Home() {
  return (
    <main className="h-screen w-full">
      <div className="mx-auto grid h-full max-w-[90vw] grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
        <aside className="scrollbar-hide hidden space-y-5 overflow-y-auto p-5 lg:block">
          <Header />
          <SearchInput />
          <ProfileCard />
          <DiscoverSection />
        </aside>
        <section className="scrollbar-hide space-y-10 overflow-y-auto p-5 pb-30">
          {blogContentMock.map((content, index) => (
            <BlogCard key={index} content={content} />
          ))}
        </section>
        <aside className="scrollbar-hide hidden overflow-y-auto lg:block">
          <SuggestedFriends />
        </aside>
      </div>
    </main>
  );
}
