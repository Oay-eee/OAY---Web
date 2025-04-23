import { IconExclamationMark } from "@tabler/icons-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 text-destructive flex items-center gap-x-2 rounded-md p-3 text-sm">
      <IconExclamationMark className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
