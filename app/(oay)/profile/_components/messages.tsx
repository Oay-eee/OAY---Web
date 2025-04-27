'use client';

import { MouseEventHandler, ReactNode, useRef } from 'react';

import { messageMock } from '@/assets/mock';
import { IconMessage2 } from '@tabler/icons-react';
import { motion, useInView } from 'framer-motion';

import { Card, H2, H4 } from '@/components/ui';

type AnimatedItemProps = {
  children: ReactNode;
  delay?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const AnimatedItem = ({ children, delay = 0, onClick }: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const MessageItem = ({ sender, preview }: { sender: string; preview: string }) => (
  <div className="rounded-lg bg-zinc-800 p-4 transition-colors hover:bg-zinc-700">
    <div className="flex flex-col gap-3 text-white">
      <H4>{sender}</H4>
      <span className="text-sm text-zinc-400">{preview}</span>
    </div>
  </div>
);

export const Messages = () => (
  <Card className="rounded-lg bg-zinc-900 p-5">
    <H2 className="mb-4 flex items-center gap-2 text-white">
      <IconMessage2 size={24} /> Messages
    </H2>
    <div className="space-y-2">
      {messageMock.map((message) => (
        <AnimatedItem
          key={message.id}
          delay={message.delay}
          onClick={() => console.log(`Clicked message from: ${message.sender}`)}
        >
          <MessageItem sender={message.sender} preview={message.preview} />
        </AnimatedItem>
      ))}
    </div>
  </Card>
);
