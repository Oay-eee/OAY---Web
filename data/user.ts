import { prisma } from "@/lib";

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};

export const getSuggestedFriends = async (currentUserId: string) => {
  try {
    return await prisma.user.findMany({
      where: {
        id: { not: currentUserId },
        AND: [
          {
            NOT: {
              OR: [
                { sentFriendRequests: { some: { receiverId: currentUserId } } },
                { receivedFriendRequests: { some: { senderId: currentUserId } } },
              ],
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        image: true,
        gender: true,
        pseudo: true,
      },
    });
  } catch {
    return null;
  }
};
