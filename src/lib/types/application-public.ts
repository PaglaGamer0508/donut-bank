import { Application } from "./application";

export type ApplicationPublic = Pick<
  Application,
  "id" | "name" | "applicationId" | "logo" | "websiteUrl"
>;
