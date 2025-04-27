import { Card } from '@/components/ui';

export const Notifications = () => (
  <Card className="rounded-lg bg-zinc-900 p-5">
    <h2 className="mb-3 text-xl font-semibold">Notifications</h2>
    <p className="text-gray-600">Latest notifications for the current user will appear here.</p>
    <ul className="list-disc pl-5">
      <li>Notification 1: New friend request</li>
      <li>Notification 2: Post liked</li>
    </ul>
  </Card>
);
