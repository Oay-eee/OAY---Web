import Link from "next/link";
import { ExpandableCard } from "@/components/aceternity";

export const SuggestedFriends = () => (
  <div className="mt-5">
    <div className="flex items-center justify-between">
      <h2 className="my-5 text-2xl font-bold text-white">Suggested friends</h2>
      <Link href="#" className="text-sm underline">
        View more
      </Link>
    </div>
    <ExpandableCard />
  </div>
);
