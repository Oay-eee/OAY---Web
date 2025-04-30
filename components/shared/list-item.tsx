import { ReactNode } from 'react';

import Link from 'next/link';

import { H4 } from '@/components/ui';

type ListItemProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
};

export const ListItem = ({ title, description, icon, href }: ListItemProps) => (
  <div className="rounded-lg bg-zinc-800 p-4 transition-colors hover:bg-zinc-700">
    <div className="flex items-center gap-5">
      <div>{icon}</div>
      <div className="flex flex-col gap-3 text-white">
        {href ? (
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        ) : (
          <H4>{title}</H4>
        )}
        {description && <span className="text-sm text-zinc-400">{description}</span>}
      </div>
    </div>
  </div>
);
