import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ClientLayout } from "@/components/layout";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Oay",
  description: "OAY! Stay up to date with everything happening in society with OAY",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} antialiased`}>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </SessionProvider>
  );
}
