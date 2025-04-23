"use client";

import Image from "next/image";
import { useCurrentUser } from "@/hooks";

export default function Profile() {
  const currentUser = useCurrentUser();

  if (!currentUser?.image) return <h1>No image available</h1>;

  return (
    <main className="flex items-center gap-5">
      <Image
        src={currentUser?.image}
        width={100}
        height={100}
        alt="User avatar"
        className="rounded-full"
      />
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
        {currentUser?.name}
      </h1>
    </main>
  );
}
