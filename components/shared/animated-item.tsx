'use client';

import { MouseEventHandler, ReactNode, useRef } from 'react';

import { motion, useInView } from 'framer-motion';

type AnimatedItemProps = {
  children: ReactNode;
  delay?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const AnimatedItem = ({ children, delay = 0, onClick }: AnimatedItemProps) => {
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
