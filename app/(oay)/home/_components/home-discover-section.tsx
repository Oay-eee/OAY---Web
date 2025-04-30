import { ReactNode } from 'react';

import {
  IconBuilding,
  IconList,
  IconMap,
  IconNews,
  IconPhone,
  IconStar,
  IconTag,
  IconUsers,
} from '@tabler/icons-react';

import { AnimatedList, ListItem } from '@/components/shared';

type Discover = {
  id: string;
  title: string;
  icon: ReactNode;
  href: string;
  delay?: number;
};

const items: Discover[] = [
  {
    id: '1',
    title: 'Popular news of the day',
    icon: <IconNews stroke={2} />,
    href: '/news',
  },
  {
    id: '2',
    title: 'Best contributors',
    icon: <IconStar stroke={2} />,
    href: '/contributors',
  },
  {
    id: '3',
    title: 'Important contacts',
    icon: <IconPhone stroke={2} />,
    href: '/contacts',
  },
  {
    id: '4',
    title: 'Available offers',
    icon: <IconTag stroke={2} />,
    href: '/offers',
  },
  {
    id: '5',
    title: 'Events participants',
    icon: <IconUsers stroke={2} />,
    href: '/events/participants',
  },
  {
    id: '6',
    title: 'Companies',
    icon: <IconBuilding stroke={2} />,
    href: '/companies',
  },
  {
    id: '7',
    title: 'Stations by region',
    icon: <IconMap stroke={2} />,
    href: '/stations',
  },
];

export const DiscoverSection = () => (
  <AnimatedList<Discover>
    icon={<IconList />}
    title="Discovers"
    items={items}
    renderItemAction={(item: Discover) => <ListItem title={item.title} icon={item.icon} />}
    getKeyAction={(item: Discover) => item.id}
  />
);
