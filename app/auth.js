import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as Yup from "yup";
import bcrypt from "bcrypt";
import { authConfig } from "@/app/auth.config";

import { getUser } from "@/lib/api";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
          }).validateSync(credentials);

          if (parsedCredentials) {
            const { email, password } = parsedCredentials;
            const user = await getUser(email);
            if (!user) return null;

            const isPasswordValid = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordValid) {
              return user;
            }
          }
        } catch (err) {
          console.log("Invalid credentials", credentials);
          return null;
        }
      },
    }),
  ],
});
