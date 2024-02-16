import { Application } from "@prisma/client";

export type Token = {
  id: string;
  token: string;
  subAccountId: string;
  applicationId: string;
  limit: number;
  application: Pick<
    Application,
    "id" | "name" | "logo" | "applicationId" | "websiteUrl"
  >;
};
