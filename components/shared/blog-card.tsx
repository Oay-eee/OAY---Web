import { ReactNode } from 'react';

import Image from 'next/image';

import { IconClock, IconMessage2, IconMoodHappy, IconThumbDown, IconThumbUp } from '@tabler/icons-react';

import { H2 } from '@/components/ui';

type NewsPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt?: string;
  fokontany: string;
  category: string;
  voteCount: {
    true: number;
    false: number;
  };
  userVote?: 'true' | 'false' | null;
  commentCount: number;
};

type BlogImageProps = {
  image?: string;
  alt: string;
};

type BlogInteractionsProps = {
  votes?: { true: number; false: number };
  comments?: number;
};

const BlogImage = ({ image, alt }: BlogImageProps) => {
  if (!image) return null;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-200 group-hover:scale-95 group-hover:rounded-2xl"
      />
    </div>
  );
};

type BlogHeaderProps = {
  title: string;
  date: string;
};

const BlogHeader = ({ title, date }: BlogHeaderProps) => (
  <div className="my-4 flex items-center justify-between">
    <H2>{title}</H2>
    <div className="bg-chart-2/70 flex items-center gap-2 rounded-full px-5 py-1 text-white">
      <IconClock size={20} />
      <span className="text-sm">{date}</span>
    </div>
  </div>
);

type InteractionItemProps = {
  icon: ReactNode;
  count: number;
};

const InteractionItem = ({ icon, count }: InteractionItemProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{count}</span>
  </div>
);

const BlogInteractions = ({ votes = { true: 0, false: 0 }, comments = 0 }: BlogInteractionsProps) => (
  <div className="mt-10 flex items-center justify-between">
    <div className="flex gap-10">
      <InteractionItem icon={<IconThumbUp className="cursor-pointer" stroke={2} />} count={votes.true} />
      <InteractionItem icon={<IconThumbDown className="cursor-pointer" stroke={2} />} count={votes.false} />
      <InteractionItem icon={<IconMoodHappy className="cursor-pointer" stroke={2} />} count={79} />
    </div>
    <InteractionItem icon={<IconMessage2 className="cursor-pointer" stroke={2} />} count={comments} />
  </div>
);

type BlogCardProps = {
  content: NewsPost;
};

export const BlogCard = ({ content }: BlogCardProps) => (
  <div className="group relative overflow-hidden rounded-2xl bg-zinc-800 transition-shadow duration-200 hover:shadow-xl">
    <BlogImage image={content.imageUrl} alt="thumbnail" />
    <div className="p-4">
      <BlogHeader title={content.title} date={content.createdAt} />
      <p className="text-sm text-zinc-100">{content.content}</p>
      <BlogInteractions votes={content.voteCount} comments={content.commentCount} />
    </div>
  </div>
);
