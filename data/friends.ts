'use server';

import { prisma } from '@/lib';

export const sendFriendRequest = async (currentUserId: string, targetUserId: string) => {
  try {
    const existingRequest = await prisma.friends.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: targetUserId,
        isDeleted: false,
      },
    });

    if (existingRequest) {
      console.error('Friend request already sent.');
    }

    return await prisma.friends.create({
      data: {
        senderId: currentUserId,
        receiverId: targetUserId,
      },
    });
  } catch (error) {
    console.error('Error when sending friend request', error);
  }
};
