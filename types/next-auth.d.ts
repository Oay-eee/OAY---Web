import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isTwoFactorEnabled?: boolean;
      isOAuth?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}

declare module 'next/server' {
  interface NextRequest {
    auth?: import('next-auth').Session | null;
  }
}
