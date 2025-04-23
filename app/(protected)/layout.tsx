import { ReactNode } from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconUser,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui";

export default function SkillPathLayout({ children }: { children: ReactNode }) {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/home",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/profile",
    },
    {
      title: "Additional tabs #1",
      icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/additional-tabs",
    },
    {
      title: "Additional tabs #2",
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/additional-tabs",
    },
    {
      title: "Additional tabs #3",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/additional-tabs",
    },
  ];

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-5">
      {children}
      <FloatingDock items={links} />
    </main>
  );
}
