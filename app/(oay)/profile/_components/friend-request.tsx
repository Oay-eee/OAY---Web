'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { receivedFriendRequest } from '@/data';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ClipLoader } from 'react-spinners';

import { Button, Card, H4 } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';

type FriendRequestType = {
  id: string;
  sender: {
    id: string;
    name: string | null;
    pseudo: string | null;
    image: string | null;
    gender: 'MALE' | 'FEMALE' | null;
  };
};

type FriendRequestProps = {
  currentUserId: string;
};

export const FriendRequest = ({ currentUserId }: FriendRequestProps) => {
  const [requests, setRequests] = useState<FriendRequestType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await receivedFriendRequest(currentUserId);
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch friend requests', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <ClipLoader size={30} color="white" />
      </div>
    );
  }

  if (!requests.length) {
    return <div className="p-4 text-center text-gray-500">No friend requests yet :&#39;).</div>;
  }

  return (
    <section className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="flex flex-row items-center gap-5 rounded-lg border p-4 shadow-sm">
          {request.sender.image ? (
            <Image
              src={request.sender.image}
              alt={request.sender.name || 'User avatar'}
              width={60}
              height={60}
              className="rounded-full border-4 border-white object-cover"
            />
          ) : (
            <Skeleton className="h-20 w-20 rounded-full" />
          )}
          <div className="flex-1">
            <H4 className="font-semibold">{request.sender.name || request.sender.pseudo}</H4>
            <span className="text-sm text-zinc-400">{request.sender.pseudo}</span>
          </div>
          <div className="flex gap-2">
            <Button className="bg-chart-2/80 cursor-pointer rounded-full text-white hover:text-black">
              <IconCheck /> Accept
            </Button>
            <Button className="bg-destructive/80 cursor-pointer rounded-full text-white hover:text-black">
              <IconX /> Decline
            </Button>
          </div>
        </Card>
      ))}
    </section>
  );
};
