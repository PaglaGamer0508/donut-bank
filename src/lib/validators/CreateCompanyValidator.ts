import { z } from "zod";

export const CreateCompanyValidator = z.object({
  userId: z.string(),
  companyName: z
    .string()
    .min(5, { message: "Company name must be at least 5 characters" })
    .max(50, { message: "Company name can't be longer than 50 characters" }),
  companyLogo: z.string(),
  email: z.string().email(),
});

export type CreateCompanyValidatorType = z.infer<typeof CreateCompanyValidator>;
