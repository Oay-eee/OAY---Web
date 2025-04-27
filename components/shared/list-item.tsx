import { Button, H4 } from '@/components/ui';

type ListItemProps = {
  title: string;
  description: string;
  showButton?: boolean;
};

export const ListItem = ({ title, description, showButton = false }: ListItemProps) => (
  <div className="rounded-lg bg-zinc-800 p-4 transition-colors hover:bg-zinc-700">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-3 text-white">
        <H4>{title}</H4>
        <span className="text-sm text-zinc-400">{description}</span>
      </div>
      {showButton && (
        <Button variant="link" className="cursor-pointer text-zinc-300 hover:text-white">
          View more
        </Button>
      )}
    </div>
  </div>
);
