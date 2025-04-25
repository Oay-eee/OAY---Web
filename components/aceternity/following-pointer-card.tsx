"use client";

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type FollowingPointerCardProps = {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
};

export const FollowerPointerCard = ({ children, className }: FollowingPointerCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  };
  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };
  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>{isInside}</AnimatePresence>
      {children}
    </div>
  );
};
