import { ReactNode } from 'react';

import Image from 'next/image';

import { Cover } from '@/assets/images';
import { IconClock, IconMessage2, IconMoodHappy, IconThumbDown, IconThumbUp } from '@tabler/icons-react';

import { Badge, Card, H2, H4, P } from '@/components/ui';

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

type BlogCardProps = {
  content: NewsPost;
};

type BlogImageProps = {
  image?: string;
  alt: string;
};

type BlogHeaderProps = {
  title: string;
  category: string;
};

type BlogAvatarProps = {
  user: string;
  postedAt: string;
  where: string;
};

type BlogInteractionsProps = {
  votes?: { true: number; false: number };
  comments?: number;
};

type InteractionItemProps = {
  icon: ReactNode;
  count: number;
};

const BlogImage = ({ image, alt }: BlogImageProps) =>
  image ? (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-200 group-hover:scale-95 group-hover:rounded-2xl"
      />
    </div>
  ) : null;

const BlogHeader = ({ title, category }: BlogHeaderProps) => (
  <div className="my-4 flex items-center justify-between gap-4">
    <H2 className="max-w-[70%] truncate">{title}</H2>
    <Badge
      variant="outline"
      className="bg-chart-2/15 text-chart-2 flex max-w-[30%] items-center gap-2 truncate overflow-hidden rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap"
    >
      <IconClock size={16} />
      {category}
    </Badge>
  </div>
);

const BlogAvatar = ({ user, postedAt, where }: BlogAvatarProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(postedAt));

  return (
    <div className="mb-4 flex items-center gap-5">
      <Image
        src={Cover}
        alt="User avatar"
        width={50}
        height={50}
        className="h-[50px] w-[50px] rounded-full object-cover"
      />
      <div>
        <H4>{user}</H4>
        <p className="text-xs text-zinc-300">
          {formattedDate} – {where}
        </p>
      </div>
    </div>
  );
};

const InteractionItem = ({ icon, count }: InteractionItemProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{count}</span>
  </div>
);

const BlogInteractions = ({ votes = { true: 0, false: 0 }, comments = 0 }: BlogInteractionsProps) => (
  <div className="mt-6 flex items-center justify-between">
    <div className="flex gap-6">
      <InteractionItem icon={<IconThumbUp className="cursor-pointer" stroke={2} />} count={votes.true} />
      <InteractionItem icon={<IconThumbDown className="cursor-pointer" stroke={2} />} count={votes.false} />
      <InteractionItem icon={<IconMoodHappy className="cursor-pointer" stroke={2} />} count={79} />
    </div>
    <InteractionItem icon={<IconMessage2 className="cursor-pointer" stroke={2} />} count={comments} />
  </div>
);

export const BlogCard = ({ content }: BlogCardProps) => (
  <Card className="group relative overflow-hidden rounded-2xl bg-zinc-800 p-0 transition-shadow duration-200 hover:shadow-xl">
    <BlogImage image={content.imageUrl} alt="thumbnail" />
    <div className="p-4">
      <BlogAvatar user={content.authorName} postedAt={content.createdAt} where={content.fokontany} />
      <BlogHeader title={content.title} category={content.category} />
      <P className="text-sm text-zinc-100">{content.content}</P>
      <BlogInteractions votes={content.voteCount} comments={content.commentCount} />
    </div>
  </Card>
);
