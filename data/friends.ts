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

export const cancelFriendRequest = async (senderId: string, receiverId: string) => {
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
};

export const receivedFriendRequest = async (currentUserId: string) => {
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
};

export const acceptFriendRequest = async (requestId: string) => {
  try {
    await prisma.friends.update({
      where: { id: requestId },
      data: {
        isAccepted: true,
        acceptedAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return { success: false };
  }
};

export const declineFriendRequest = async (requestId: string) => {
  try {
    await prisma.friends.delete({
      where: { id: requestId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error declining friend request:', error);
    return { success: false };
  }
};
