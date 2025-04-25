import { ReactNode } from "react";
import {
  IconBrandOffice,
  IconEdit,
  IconGenderMale,
  IconMailbox,
  IconPointFilled,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Badge, Button } from "@/components/ui";

export function SidebarUserInfo() {
  return (
    <div className="relative mx-auto mt-10 flex w-[400px] flex-col rounded-[20px] bg-zinc-800 p-4 text-white">
      <div className="flex flex-col items-center">
        <h2 className="my-5 text-center text-2xl font-bold">User information&#39;s</h2>
        <Button
          className="w-max cursor-pointer rounded-full"
          onClick={() => toast.info("This functionality is under development.")}
        >
          <IconEdit />
          Edit
        </Button>
      </div>
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      <UserInfoRow icon={<IconBrandOffice />} label="Role(s)" value="Admin" />
      <UserInfoRow icon={<IconMailbox />} label="Email" value="fiantsorav@gmail.com" />
      <UserInfoRow icon={<IconGenderMale />} label="Gender" value="MALE" />
      <UserInfoRow icon={<IconPointFilled />} label="Point(s)" value="1" />
    </div>
  );
}

function UserInfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <Badge className="bg-chart-2/50 border-chart-2 border font-semibold text-white">
        {value}
      </Badge>
    </div>
  );
}
