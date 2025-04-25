"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";
import { FormError, FormSuccess } from "@/components/shared";

type VerificationResultProps = {
  success?: string;
  error?: string;
};

export const VerificationResult = ({ success, error }: VerificationResultProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loaderColor = theme === "dark" ? "white" : "black";

  return (
    <div className="flex flex-col items-center">
      {isMounted && !success && !error && <BeatLoader color={loaderColor} />}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
};
