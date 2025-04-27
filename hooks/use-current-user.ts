import { useSession } from 'next-auth/react';

/**
 * Custom hook to retrieve the current authenticated user from the NextAuth session.
 * @returns The authenticated user object or undefined if not authenticated
 */
export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  return session?.user || null;
};
