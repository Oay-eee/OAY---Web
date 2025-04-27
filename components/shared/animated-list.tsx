'use client';

import { ReactElement, ReactNode } from 'react';

import { AnimatedItem } from '@/components/shared/animated-item';
import { Card, H2 } from '@/components/ui';

type AnimatedListProps<T> = {
  title: string;
  icon: ReactElement;
  items: T[];
  renderItemAction: (item: T) => ReactNode;
  getKeyAction: (item: T) => string;
  getDelayAction?: (item: T) => number;
  onItemClickAction?: (item: T) => void;
};

export function AnimatedList<T>({
  title,
  icon,
  items,
  renderItemAction,
  getKeyAction,
  getDelayAction = () => 0,
  onItemClickAction = () => {},
}: AnimatedListProps<T>) {
  return (
    <Card className="rounded-lg bg-zinc-900 p-5">
      <H2 className="mb-4 flex items-center gap-2 text-white">
        {icon} {title}
      </H2>
      <div className="space-y-2">
        {items.map((item) => (
          <AnimatedItem key={getKeyAction(item)} delay={getDelayAction(item)} onClick={() => onItemClickAction(item)}>
            {renderItemAction(item)}
          </AnimatedItem>
        ))}
      </div>
    </Card>
  );
}
