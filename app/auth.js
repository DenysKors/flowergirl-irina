import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as Yup from "yup";
import { authConfig } from "@/app/auth.config";

import { getUser } from "@/lib/api";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          let user = null;
          const parsedCredentials = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
          }).validateSync(credentials);
          if (parsedCredentials) {
            const { email, password } = parsedCredentials;
            user = await getUser(email, password);
            if (!user) return null;
            return user;
          }
        } catch (err) {
          console.log("Invalid credentials", credentials);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
        token.firstName = user.firstName;
        token.surName = user.surName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.surName = token.surName;
      }
      return session;
    },
  },
});
