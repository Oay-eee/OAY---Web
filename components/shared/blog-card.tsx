import Image from 'next/image';

import { IconClock, IconMessage2, IconMoodHappy, IconThumbDown, IconThumbUp } from '@tabler/icons-react';

import { BlogContent } from '@/app/(oay)/profile/page';

import { FollowerPointerCard } from '../aceternity';

const BlogImage = ({ image, alt }: { image: BlogContent['image']; alt: string }) => (
  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
    <Image
      src={image}
      alt={alt}
      fill
      className="object-cover transition-transform duration-200 group-hover:scale-95 group-hover:rounded-2xl"
    />
  </div>
);

const BlogHeader = ({ title, date }: { title: string; date: string }) => (
  <div className="my-4 flex items-center justify-between">
    <h2 className="text-xl font-bold text-white">{title}</h2>
    <div className="bg-chart-2/70 flex items-center gap-2 rounded-full px-5 py-1 text-white">
      <IconClock size={20} />
      <span className="text-sm">{date}</span>
    </div>
  </div>
);

const BlogInteractions = () => (
  <div className="mt-10 flex items-center justify-between">
    <div className="flex gap-10">
      <div className="flex items-center gap-2">
        <IconThumbUp className="cursor-pointer" stroke={2} />
        <span>19</span>
      </div>
      <div className="flex items-center gap-2">
        <IconThumbDown className="cursor-pointer" stroke={2} />
        <span>45</span>
      </div>
      <div className="flex items-center gap-2">
        <IconMoodHappy className="cursor-pointer" stroke={2} />
        <span>79</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <IconMessage2 className="cursor-pointer" stroke={2} />
      <span>45</span>
    </div>
  </div>
);

export const BlogCard = ({ content }: { content: BlogContent }) => (
  <FollowerPointerCard>
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-800 transition-shadow duration-200 hover:shadow-xl">
      <BlogImage image={content.image} alt="thumbnail" />
      <div className="p-4">
        <BlogHeader title={content.title} date={content.date} />
        <p className="text-sm text-zinc-100">{content.description}</p>
        <BlogInteractions />
      </div>
    </div>
  </FollowerPointerCard>
);
