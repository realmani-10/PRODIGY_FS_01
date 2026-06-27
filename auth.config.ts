import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, verifyPassword } from "@/lib/db/users";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const isValid = await verifyPassword(password, user.hashedPassword);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/login";
      const isOnRegister = nextUrl.pathname === "/register";

      if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }

      // Redirect logged-in users away from login/register
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
};
