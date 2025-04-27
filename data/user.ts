'use server';

import { prisma } from '@/lib';

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log(`No user found with id: ${id}`);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const getSuggestedFriends = async (currentUserId: string | undefined) => {
  if (!currentUserId) return [];

  try {
    return await prisma.user.findMany({
      where: {
        id: { not: currentUserId },
        NOT: {
          AND: [
            { sentFriendRequests: { some: { receiverId: currentUserId } } },
            { receivedFriendRequests: { some: { senderId: currentUserId } } },
          ],
        },
      },
    });
  } catch (err) {
    console.error('Error fetching suggested friends:', err);
    return [];
  }
};
