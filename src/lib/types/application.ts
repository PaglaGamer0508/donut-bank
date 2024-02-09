export type Application = {
  id: string;
  applicationId: string;
  logo: string;
  name: string;
  email: string;
  createdAt: Date;
  balance: number;
  websiteUrl: string | null;
  ownerId: string;
};
