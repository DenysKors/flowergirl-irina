import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      firstName?: string;
      surName?: string;
      role?: string;
    } & DefaultSession["user"];
  }
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName?: string;
    surName?: string;
    role?: string;
  }
}