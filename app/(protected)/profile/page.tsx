"use client";

import { mockedBlogContents } from "@/data";
import { useCurrentUser } from "@/hooks";
import { BlogCard } from "@/components/common";

export default function Home() {
  const currentUser = useCurrentUser();

  if (!currentUser?.image) return <h1>No image available</h1>;

  return (
    <main className="h-screen w-full">
      <div className="mx-auto grid h-full max-w-[90vw] grid-cols-1 lg:grid-cols-[1fr_2fr]">
        <div className="scrollbar-hide hidden overflow-y-auto p-5 lg:block">Profile details</div>
        <div className="scrollbar-hide space-y-10 overflow-y-auto p-5 px-20 pb-30">
          <h2 className="my-5 text-2xl font-bold text-white">This user&#39;s posts</h2>
          {mockedBlogContents.map((content, index) => (
            <BlogCard key={index} content={content} avatar={currentUser.image} />
          ))}
        </div>
      </div>
    </main>
  );
}
