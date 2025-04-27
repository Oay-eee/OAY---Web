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
      return null;
    }

    return await prisma.friends.create({
      data: {
        senderId: currentUserId,
        receiverId: targetUserId,
      },
    });
  } catch (error) {
    console.error('Error when sending friend request', error);
    return null;
  }
};

export async function cancelFriendRequest(senderId: string, receiverId: string) {
  try {
    return await prisma.friends.delete({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });
  } catch (error) {
    console.error('Cancel request error:', error);
    return { success: false };
  }
}

export async function receivedFriendRequest(currentUserId: string) {
  try {
    return await prisma.friends.findMany({
      where: {
        receiverId: currentUserId,
        isAccepted: false,
        isDeleted: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            pseudo: true,
            image: true,
            gender: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching received friend requests:', error);
    return [];
  }
}
