'use client';

import { notificationMock } from '@/assets/mock';
import { IconWorld } from '@tabler/icons-react';

import { AnimatedList, ListItem } from '@/components/shared';

type Notification = {
  id: string;
  title: string;
  description: string;
  delay?: number;
};

export const Notifications = () => (
  <AnimatedList<Notification>
    title="Notifications"
    icon={<IconWorld size={24} />}
    items={notificationMock}
    renderItemAction={(notification) => (
      <ListItem title={notification.title} description={notification.description} showButton />
    )}
    getKeyAction={(notification) => notification.id}
    getDelayAction={(notification) => notification.delay || 0}
    onItemClickAction={(notification) => console.log(`Clicked notification: ${notification.title}`)}
  />
);
