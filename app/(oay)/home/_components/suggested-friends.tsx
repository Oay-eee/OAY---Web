import Link from "next/link";
import { User } from "next-auth";
import { ExpandableCard } from "@/components/aceternity";

type SuggestedFriendsProps = {
  suggestedFriends: User[] | null;
  loading: boolean;
};

export const SuggestedFriends = ({ suggestedFriends, loading }: SuggestedFriendsProps) => (
  <div className="mt-5">
    <div className="flex items-center justify-between">
      <h2 className="my-5 text-2xl font-bold text-white">Suggested friends</h2>
      <Link href="#" className="text-sm underline">
        View more
      </Link>
    </div>
    {loading ? <h1>Loading...</h1> : <ExpandableCard data={suggestedFriends} />}
  </div>
);
