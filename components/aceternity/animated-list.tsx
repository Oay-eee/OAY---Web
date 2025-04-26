'use client';

import { MouseEventHandler, ReactNode, UIEvent, useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { IconBuilding, IconMap, IconNews, IconPhone, IconStar, IconTag, IconUsers } from '@tabler/icons-react';
import { motion, useInView } from 'framer-motion';

type ItemType = {
  titre: string;
  icon: ReactNode;
  href: string;
};

type AnimatedItemProps = {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type AnimatedListProps = {
  items?: ItemType[];
  onItemSelect?: (item: ItemType, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  initialSelectedIndex?: number;
};

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4"
    >
      {children}
    </motion.div>
  );
};

export const AnimatedList = ({
  items = [
    {
      titre: 'Popular news of the day',
      icon: <IconNews stroke={2} />,
      href: '/news',
    },
    {
      titre: 'Best contributors',
      icon: <IconStar stroke={2} />,
      href: '/contributors',
    },
    {
      titre: 'Important contacts',
      icon: <IconPhone stroke={2} />,
      href: '/contacts',
    },
    {
      titre: 'Available offers',
      icon: <IconTag stroke={2} />,
      href: '/offers',
    },
    {
      titre: 'Events participants',
      icon: <IconUsers stroke={2} />,
      href: '/events/participants',
    },
    {
      titre: 'Companies',
      icon: <IconBuilding stroke={2} />,
      href: '/companies',
    },
    {
      titre: 'Stations by region',
      icon: <IconMap stroke={2} />,
      href: '/stations',
    },
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  initialSelectedIndex = -1,
}: AnimatedListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          onItemSelect?.(items[selectedIndex], selectedIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;

    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
    if (selectedItem) {
      const margin = 50;
      const { scrollTop, clientHeight } = container;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < scrollTop + margin) {
        container.scrollTo({ top: itemTop - margin, behavior: 'smooth' });
      } else if (itemBottom > scrollTop + clientHeight - margin) {
        container.scrollTo({ top: itemBottom - clientHeight + margin, behavior: 'smooth' });
      }
    }

    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative mt-3 ${className}`}>
      <div
        ref={listRef}
        className="max-h-[400px] overflow-y-auto"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#222 #060606' }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={item.href}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => onItemSelect?.(item, index)}
          >
            <Link
              href={item.href}
              className={`block rounded-lg p-4 transition-colors ${
                selectedIndex === index ? 'bg-[#222]' : 'bg-[#111]'
              } ${itemClassName}`}
            >
              <div className="flex items-center gap-3 text-white">
                <div className="text-xl">{item.icon}</div>
                <p className="m-0">{item.titre}</p>
              </div>
            </Link>
          </AnimatedItem>
        ))}
      </div>

      {showGradients && (
        <>
          <div
            className="pointer-events-none absolute top-0 right-0 left-0 h-[50px] bg-gradient-to-b from-[#060606] to-transparent transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] bg-gradient-to-t from-[#060606] to-transparent transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};
