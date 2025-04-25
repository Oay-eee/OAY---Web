"use client";

import { useSession } from "next-auth/react";

/**
 * Custom hook to retrieve the current authenticated user from the NextAuth session.
 * @returns The authenticated user object or undefined if not authenticated
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
