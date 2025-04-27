import { Card } from '@/components/ui';

export const Messages = () => (
  <Card className="rounded-lg bg-zinc-900 p-5">
    <h2 className="mb-3 text-xl font-semibold">Messages</h2>
    <p className="text-gray-600">Recent message will appear here</p>
    <ul className="list-disc pl-5">
      <li>Message 1: Hello World</li>
      <li>Message 2: Hello Oay</li>
    </ul>
  </Card>
);
