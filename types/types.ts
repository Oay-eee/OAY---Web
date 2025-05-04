import { $Enums } from '@prisma/client';

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  pseudo: string | null;
  image: string | null;
  gender: $Enums.Gender | null;
  roles: string;
  points: number;
  createdAt: Date;
  isTwoFactorEnabled: boolean;
};
