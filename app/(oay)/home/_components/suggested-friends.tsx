import Link from "next/link";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { ExpandableCard } from "@/components/aceternity";

type SuggestedFriendsProps = {
  suggestedFriends: User[] | null;
  loading: boolean;
};

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

export const SuggestedFriends = ({ suggestedFriends, loading }: SuggestedFriendsProps) => (
  <div className="mt-5">
    <div className="flex items-center justify-between">
      <h2 className="my-5 text-2xl font-bold text-white">Suggested friends</h2>
      <Link href="#" className="text-sm underline">
        View more
      </Link>
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
