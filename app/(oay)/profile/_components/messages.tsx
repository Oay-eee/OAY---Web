'use client';

import { messageMock } from '@/assets/mock';
import { IconMessage2 } from '@tabler/icons-react';

import { AnimatedList, ListItem } from '@/components/shared';

type Message = {
  id: string;
  sender: string;
  preview: string;
  delay?: number;
};

export const Messages = () => (
  <AnimatedList<Message>
    title="Messages"
    icon={<IconMessage2 size={24} />}
    items={messageMock}
    renderItemAction={(message) => <ListItem title={message.sender} description={message.preview} />}
    getKeyAction={(message) => message.id}
    getDelayAction={(message) => message.delay || 0}
    onItemClickAction={(message) => console.log(`Clicked message from: ${message.sender}`)}
  />
);
