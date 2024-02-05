export type Company = {
  id: string;
  logo: string | null;
  name: string;
  email: string;
  createdAt: Date;
  balance: number;
  websiteUrl: string | null;
  ownerId: string;
};
