'use client';

import { ReactNode } from 'react';

import { logout } from '@/actions';

interface LogoutButtonProps {
  children?: ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
