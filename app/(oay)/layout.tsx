import { ReactNode } from "react";
import { IconBrandGithub, IconBrandX, IconHome, IconPlus, IconUser } from "@tabler/icons-react";
import { BackgroundBeams, FloatingDock } from "@/components/aceternity";

export default function OayLayout({ children }: { children: ReactNode }) {
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
      title: "Create a report",
      icon: <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/create-report",
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
      <BackgroundBeams className="z-[-999]" />
    </main>
  );
}
