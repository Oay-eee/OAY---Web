import { ReactNode } from 'react';

import { cn } from '@/lib';

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export const H1 = ({ children, className }: TypographyProps) => {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>{children}</h1>
  );
};

export const H2 = ({ children, className }: TypographyProps) => {
  return (
    <h2 className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, className }: TypographyProps) => {
  return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>;
};

export const H4 = ({ children, className }: TypographyProps) => {
  return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>;
};

export const P = ({ children, className }: TypographyProps) => {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>;
};
