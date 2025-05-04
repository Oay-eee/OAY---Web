'use client';

import { useEffect, useState } from 'react';

import { useCurrentUser } from '@/hooks';
import { User } from 'next-auth';
import { toast } from 'sonner';

import { ExpandableCard } from '@/components/aceternity';
import { H2 } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoading = () => (
  <div className="flex flex-col items-center justify-between rounded-xl p-4 md:flex-row">
    <div className="flex flex-col gap-4 md:flex-row">
      <Skeleton className="h-40 w-40 rounded-lg md:h-14 md:w-14" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[150px] md:h-6" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <Skeleton className="mt-4 h-10 w-24 rounded-full md:mt-0" />
  </div>
);

export const SuggestedFriends = () => {
  const [suggestedFriends, setSuggestedFriends] = useState<User[] | null>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser?.id) return;

    (async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/friends/suggested');
        const data = await response.json();

        if (response.ok) {
          setSuggestedFriends(data);
        } else {
          toast.error('Error fetching suggested friends');
        }
      } catch (err) {
        console.error('Error fetching suggested friends:', err);
        toast.error('Error fetching suggested friends');
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser?.id]);

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <H2 className="my-4 flex items-center gap-2 text-white">Suggested friends</H2>
      </div>
      {loading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonLoading key={`skeleton-${index}`} />
          ))}
        </>
      ) : (
        <ExpandableCard data={suggestedFriends} />
      )}
    </div>
  );
};
