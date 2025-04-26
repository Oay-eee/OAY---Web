"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { blogContentMock } from "@/assets/mock";
import { useCurrentUser } from "@/hooks";
import { User } from "next-auth";
import { toast } from "sonner";
import { PlaceholdersAndVanishInput } from "@/components/aceternity";
import { BlogCard, ProfileCard } from "@/components/shared";
import { DiscoverSection, Header, SuggestedFriends } from "@/app/(oay)/home/_components";

export default function Home() {
  const [suggestedFriends, setSuggestedFriends] = useState<User[] | null>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();

  const placeholders = useMemo(
    () => [
      "Who is Fiantso Harena?",
      "What is happening in your neighborhood?",
      "How about the traffics?",
    ],
    []
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

  const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    (async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/friends/suggested");
        const data = await response.json();

        if (response.ok) {
          setSuggestedFriends(data);
        } else {
          toast.error("Error fetching suggested friends");
        }
      } catch (err) {
        console.error("Error fetching suggested friends:", err);
        toast.error("Error fetching suggested friends");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser?.id]);

  return (
    <main className="h-screen w-full">
      <div className="mx-auto grid h-full max-w-[90vw] grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
        <aside className="scrollbar-hide hidden overflow-y-auto p-5 lg:block">
          <Header />
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleInputChange}
            onSubmit={handleFormSubmit}
          />
          <ProfileCard />
          <DiscoverSection />
        </aside>
        <section className="scrollbar-hide space-y-10 overflow-y-auto p-5 pb-30">
          {blogContentMock.map((content, index) => (
            <BlogCard key={index} content={content} />
          ))}
        </section>
        <aside className="scrollbar-hide hidden overflow-y-auto lg:block">
          <SuggestedFriends suggestedFriends={suggestedFriends} loading={loading} />
        </aside>
      </div>
    </main>
  );
}
