'use client';

import { ReactNode, useEffect, useId, useRef, useState } from 'react';

import Image from 'next/image';

import { useOutsideClick } from '@/hooks';
import { IconSend, IconUser, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { User } from 'next-auth';
import { toast } from 'sonner';

import { Button } from '@/components/ui';

type SuggestedFriendData = {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaLink: string;
  ctaText: string;
  content: ReactNode | string;
};

export const ExpandableCard = ({ data }: { data: User[] | null }) => {
  const [active, setActive] = useState<SuggestedFriendData | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h-full w-full bg-black/90"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <IconX size={20} />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col items-center overflow-hidden rounded-3xl p-10 md:h-fit md:max-h-[90%] dark:bg-neutral-900"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="h-50 w-50">
                <Image
                  width={200}
                  height={200}
                  src={active.image}
                  alt={active.title}
                  className="w-full rounded-full object-cover object-top"
                />
              </motion.div>
              <div className="p-5">
                <div className="flex items-start justify-between p-4 text-center">
                  <div className="">
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-zinc-100">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="dark:text-neutral-400">
                      {active.description}
                    </motion.p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center gap-10">
                <Button
                  onClick={() => {
                    toast.success('Request sent successfully');
                    setActive(false);
                  }}
                  size="lg"
                  className="bg-chart-2 hover:bg-chart-2/90 cursor-pointer rounded-full font-semibold text-white"
                >
                  <IconSend />
                  Send request
                </Button>
                <Button size="lg" className="cursor-pointer rounded-full font-semibold">
                  <IconUser />
                  View Profile
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full max-w-2xl gap-4">
        {data?.map((user) => (
          <motion.div
            layoutId={`card-${user.id}-${id}`}
            key={`card-${user.id}-${id}`}
            onClick={() =>
              setActive({
                id: user.id as string,
                title: (user.name ?? 'Unknown') as string,
                description: (user.email ?? 'No description') as string,
                image: (user.image ?? '/default-avatar.png') as string,
                ctaLink: `/profile/${user.id}`,
                ctaText: 'View Profile',
                content: `This is ${user.name ?? 'a user'} — maybe add more profile info here later.`,
              })
            }
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-neutral-800 md:flex-row"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div layoutId={`image-${user.id}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={user.image ?? '/default-avatar.png'}
                  alt={user.name ?? 'User'}
                  className="h-40 w-40 rounded-lg object-cover object-top md:h-14 md:w-14"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${user.id}-${id}`}
                  className="text-center font-medium text-neutral-800 md:text-left dark:text-neutral-200"
                >
                  {user.name ?? 'Unnamed User'}
                </motion.h3>
                <motion.p
                  layoutId={`description-${user.id}-${id}`}
                  className="text-center text-sm text-ellipsis text-neutral-600 md:text-left dark:text-neutral-400"
                >
                  {user.email ?? 'No email'}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${user.id}-${id}`}
              className="hover:bg-chart-2 mt-4 rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-black hover:text-white md:mt-0"
            >
              View Profile
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
};
