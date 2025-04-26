import { prisma } from '@/lib';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await prisma.verificationToken.findUnique({
      where: { token },
    });
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { email },
    });
  } catch {
    return null;
  }
};
