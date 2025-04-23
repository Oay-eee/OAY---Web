import authConfig from "@/auth.config";
import { getAccountByUserId, getTwoFactorConfirmationByUserId, getUserById } from "@/data";
import { prisma } from "@/lib";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account, profile }) {
      const email = profile.email ?? undefined;
      if (!email) return;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          data: {
            userId: existingUser.id,
          },
        });
        await prisma.user.delete({ where: { id: user.id } });
      } else {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) throw new Error("User ID is undefined");
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (!session.user) return session;

      const { sub, isTwoFactorEnabled, name, email, isOAuth } = token;

      session.user.id = sub ?? session.user.id;
      session.user.isTwoFactorEnabled = Boolean(isTwoFactorEnabled);
      session.user.name = name ?? session.user.name;
      session.user.email = email ?? session.user.email;
      session.user.isOAuth = Boolean(isOAuth);

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      const account = await getAccountByUserId(user.id);

      return {
        ...token,
        name: user.name ?? token.name,
        email: user.email ?? token.email,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
        isOAuth: !!account,
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  debug: true,
  ...authConfig,
});
