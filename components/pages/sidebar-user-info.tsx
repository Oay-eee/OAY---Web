import { IconBrandOffice, IconGenderMale, IconMailbox, IconPointFilled } from "@tabler/icons-react";

export function SidebarUserInfo() {
  return (
    <div className="relative mx-auto mt-10 flex w-[400px] flex-col rounded-[20px] bg-zinc-800 p-4 text-white">
      <h2 className="my-5 text-2xl font-bold">User information&#39;s</h2>
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      <UserInfoRow icon={<IconBrandOffice />} label="Role(s)" value="Admin" />
      <UserInfoRow icon={<IconMailbox />} label="Email" value="fiantsorav@gmail.com" />
      <UserInfoRow icon={<IconGenderMale />} label="Gender" value="MALE" />
      <UserInfoRow icon={<IconPointFilled />} label="Point(s)" value="1" />
    </div>
  );
}

function UserInfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
