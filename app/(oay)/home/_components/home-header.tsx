import { IconAlertSquareRoundedFilled } from '@tabler/icons-react';

import { H1 } from '@/components/ui';

export const Header = () => (
  <header className="mb-10 flex items-center gap-5">
    <IconAlertSquareRoundedFilled size={50} />
    <H1>Oay</H1>
  </header>
);
