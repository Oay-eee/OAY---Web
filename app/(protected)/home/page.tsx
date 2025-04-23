"use client";

import { ChangeEvent, FormEvent } from "react";
import { mockedBlogContents } from "@/data";
import { useCurrentUser } from "@/hooks";
import { IconAlertSquareRoundedFilled, IconCircleArrowDownFilled } from "@tabler/icons-react";
import { AnimatedList, BlogCard, ProfileCard } from "@/components/common";
import { FollowerPointerCard, PlaceholdersAndVanishInput } from "@/components/ui";

export default function Home() {
  const currentUser = useCurrentUser();

  if (!currentUser?.image) return <h1>No image available</h1>;

  const placeholders = [
    "Who is Fiantso Harena?",
    "What is happening in your neighborhood?",
    "How about the traffics?",
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <main className="h-screen w-full">
      <div className="mx-auto grid h-full max-w-[90vw] grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
        <div className="scrollbar-hide hidden overflow-y-auto p-5 lg:block">
          <div className="mb-10 flex items-center gap-5">
            <IconAlertSquareRoundedFilled size={50} />
            <h2 className="text-5xl font-bold text-white">Oay</h2>
          </div>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <ProfileCard />
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <h2 className="my-5 text-2xl font-bold text-white">Discover</h2>
              <IconCircleArrowDownFilled className="cursor-pointer" />
            </div>
            <AnimatedList />
          </div>
        </div>

        <div className="scrollbar-hide space-y-10 overflow-y-auto p-5 pb-30">
          {mockedBlogContents.map((content, index) => (
            <BlogCard key={index} content={content} avatar={currentUser.image} />
          ))}
        </div>

        <div className="scrollbar-hide hidden overflow-y-auto bg-zinc-700 p-5 lg:block">Part 3</div>
      </div>
    </main>
  );
}
