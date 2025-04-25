"use client";

import { FormEvent, ReactNode, useState } from "react";
import { cn } from "@/lib";
import { IconReport } from "@tabler/icons-react";
import { FileUpload, TextGenerateEffect } from "@/components/aceternity";
import { Button, Input, Label, Textarea } from "@/components/ui";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};

export default function CreateReport() {
  const [, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section className="h-screen w-full overflow-hidden p-6 md:p-20">
      <div className="mx-auto grid h-full max-w-[90vw] grid-cols-1 overflow-hidden rounded-2xl bg-zinc-900 md:grid-cols-2">
        <div
          className="overflow-y-auto p-6 md:p-10"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#222 #060606" }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <TextGenerateEffect words="Create a report" />
              <IconReport stroke={2} />
            </div>
            <p>Something is happening? Create a new report</p>
          </div>
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <form className="my-8 flex flex-col justify-between" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="What's happening?" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write description"
                className="max-h-48 resize-none overflow-y-auto"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="type">Report type</Label>
              <Input id="type" placeholder="What kind of report?" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Where?" type="text" />
            </LabelInputContainer>
            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            <div className="flex flex-col space-y-4">
              <Button
                className="group/btn hover:bg-chart-2 h-10 w-full cursor-pointer rounded-full bg-white font-semibold text-black shadow-[0px_0px_1px_1px_#262626] hover:text-white"
                type="submit"
              >
                Share
              </Button>
            </div>
          </form>
        </div>
        <div className="hidden h-full overflow-hidden md:block">
          <FileUpload onChange={handleFileUpload} />
        </div>
      </div>
    </section>
  );
}
