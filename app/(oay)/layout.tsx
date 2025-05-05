import { ReactNode } from 'react';

import { IconBrandGithub, IconBrandX, IconHome, IconMap, IconPlus } from '@tabler/icons-react';

import { FloatingDock } from '@/components/shared';

export default function OayLayout({ children }: { children: ReactNode }) {
  const links = [
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/home',
    },
    {
      title: 'Map',
      icon: <IconMap className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/map',
    },
    {
      title: 'Create a report',
      icon: <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/create-report',
    },
    {
      title: 'Additional tabs #2',
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/additional-tabs',
    },
    {
      title: 'Additional tabs #3',
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/additional-tabs',
    },
  ];

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-5">
      {children}
      <FloatingDock items={links} />
    </main>
  );
}
