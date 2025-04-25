"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ClipLoader } from "react-spinners";
import { Toaster } from "@/components/ui";

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <ClipLoader color="#ffffff" size={50} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
};
