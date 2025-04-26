'use client';

import { useEffect, useId, useRef, useState } from 'react';

import Image from 'next/image';

import { useCurrentUser, useOutsideClick } from '@/hooks';
import { IconSend, IconUser, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { User } from 'next-auth';
import { toast } from 'sonner';

import { Button } from '@/components/ui';

import { sendFriendRequest } from '@/data/friends';

type SuggestedFriendData = {
  id: string;
  name: string;
  email: string;
  image: string;
  ctaLink: string;
  ctaText: string;
};

type ExpandableCardProps = {
  data: User[] | null;
};

export const ExpandableCard = ({ data }: ExpandableCardProps) => {
  const [active, setActive] = useState<SuggestedFriendData | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const currentUser = useCurrentUser();

  const closeModal = () => setActive(null);

  useOutsideClick(ref, closeModal);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.body.style.overflow = active ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  const handleSendRequest = async () => {
    if (!currentUser?.id || !active?.id) return;

    try {
      await sendFriendRequest(currentUser.id, active.id);
      toast.success('Request sent successfully');
    } catch {
      toast.error('Failed to send request');
    } finally {
      closeModal();
    }
  };

  const openModal = (user: User) => {
    setActive({
      id: user.id!,
      name: user.name ?? 'Unknown',
      email: user.email ?? 'No description',
      image: user.image ?? '/default-avatar.png',
      ctaLink: `/profile/${user.id}`,
      ctaText: 'View Profile',
    });
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 h-full w-full bg-black/90"
            />
            <div className="fixed inset-0 z-[100] grid place-items-center">
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
                onClick={closeModal}
              >
                <IconX size={20} />
              </motion.button>
              <motion.div
                ref={ref}
                layoutId={`card-${active.name}-${id}`}
                className="flex h-full w-full max-w-[500px] flex-col items-center overflow-hidden rounded-3xl p-10 md:h-fit md:max-h-[90%] dark:bg-neutral-900"
              >
                <motion.div
                  layoutId={`image-${active.name}-${id}`}
                  className="dark:!border-navy-700 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400"
                >
                  <Image
                    className="h-full w-full rounded-full"
                    src={active.image}
                    alt={active.name}
                    width={100}
                    height={100}
                  />
                </motion.div>
                <div className="space-y-2 p-5 text-center">
                  <motion.h3 layoutId={`title-${active.name}-${id}`} className="font-bold text-zinc-100">
                    {active.name}
                  </motion.h3>
                  <motion.p layoutId={`description-${active.email}-${id}`} className="text-sm dark:text-neutral-400">
                    {active.email}
                  </motion.p>
                </div>
                <div className="flex w-full justify-center gap-10">
                  <Button
                    onClick={handleSendRequest}
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
          </>
        )}
      </AnimatePresence>
      <ul className="mx-auto w-full max-w-2xl gap-4">
        {data?.map((user) => (
          <motion.div
            key={`card-${user.id}-${id}`}
            layoutId={`card-${user.id}-${id}`}
            onClick={() => openModal(user)}
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
