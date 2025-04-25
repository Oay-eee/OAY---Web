import Image from "next/image";
import { mockedBlogContents } from "@/data";
import {
  IconClock,
  IconMessage2,
  IconMoodHappy,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import { FollowerPointerCard } from "";

const TitleComponent = ({ title, avatar }: { title: string; avatar: string }) => (
  <div className="flex items-center space-x-2">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="avatar"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);

export const BlogCard = ({
  content,
  avatar,
}: {
  content: (typeof mockedBlogContents)[0];
  avatar: any;
}) => (
  <FollowerPointerCard title={<TitleComponent title={content.author} avatar={avatar} />}>
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-800 transition duration-200 hover:shadow-xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
        <Image
          src={content.image}
          alt="thumbnail"
          className="h-full w-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
        />
      </div>
      <div className="p-4">
        <div className="my-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{content.title}</h2>
          <div className="bg-chart-2/70 flex items-center gap-2 rounded-full px-5 py-1 text-white">
            <IconClock size={20} />
            <span className="text-sm">{content.date}</span>
          </div>
        </div>
        <p className="text-sm font-normal text-zinc-100">{content.description}</p>
        <div className="mt-10 flex flex-row items-center justify-between">
          <div className="flex gap-10">
            <div className="flex gap-2">
              <IconThumbUp className="cursor-pointer" stroke={2} />
              <span>19</span>
            </div>
            <div className="flex gap-2">
              <IconThumbDown className="cursor-pointer" stroke={2} />
              <span>45</span>
            </div>
            <div className="flex gap-2">
              <IconMoodHappy className="cursor-pointer" stroke={2} />
              <span>79</span>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <IconMessage2 className="cursor-pointer" stroke={2} />
              <span>45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FollowerPointerCard>
);
