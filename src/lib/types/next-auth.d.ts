import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { DefaultUser } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
