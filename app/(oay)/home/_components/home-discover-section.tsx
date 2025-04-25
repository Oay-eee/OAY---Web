import { IconCircleArrowDownFilled } from "@tabler/icons-react";
import { AnimatedList } from "@/components/aceternity";

export const DiscoverSection = () => (
  <div className="mt-5">
    <div className="flex items-center justify-between">
      <h2 className="my-5 text-2xl font-bold text-white">Discover</h2>
      <IconCircleArrowDownFilled className="cursor-pointer" />
    </div>
    <AnimatedList />
  </div>
);
