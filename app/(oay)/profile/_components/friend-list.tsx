import { Card } from '@/components/ui';

export const FriendList = () => (
  <Card className="rounded-lg bg-zinc-900 p-5">
    <h2 className="mb-3 text-xl font-semibold">Friends</h2>
    <p className="text-gray-600">A list of your friends will appear here.</p>
    <ul className="list-disc pl-5">
      <li>Friend: User A</li>
      <li>Friend: User B</li>
    </ul>
  </Card>
);
