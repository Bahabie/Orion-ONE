import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@orion.one" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock user authentication
        if (
          credentials?.email === "admin@orion.one" &&
          credentials?.password === "password"
        ) {
          console.log("[AUTH SUCCESS] User logged in: " + credentials.email);
          return {
            id: "1",
            email: "admin@orion.one",
            name: "Commander",
          };
        }
        console.log("[AUTH FAILURE] Failed attempt for: " + (credentials?.email || "unknown"));
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
