"use client";

import { ChangeEvent, FormEvent } from "react";
import { IconAlertSquareRoundedFilled } from "@tabler/icons-react";
import { ProfileCard } from "@/components/common/profile-card";
import { PlaceholdersAndVanishInput } from "@/components/ui";

export default function Home() {
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
        </div>
        <div className="scrollbar-hide overflow-y-auto bg-zinc-600 p-5">Part 2</div>
        <div className="scrollbar-hide hidden overflow-y-auto bg-zinc-700 p-5 lg:block">Part 3</div>
      </div>
    </main>
  );
}
