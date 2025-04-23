import { prisma } from "@/lib";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await prisma.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch {
    return null;
  }
};
