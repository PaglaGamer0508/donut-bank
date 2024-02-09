import { z } from "zod";

export const CreateApplicationValidator = z.object({
  userId: z.string(),
  applicationName: z
    .string()
    .min(5, { message: "Application name must be at least 5 characters" })
    .max(50, {
      message: "Application name can't be longer than 50 characters",
    }),
  applicationLogo: z.string(),
  email: z.string().email(),
});

export type CreateApplicationValidatorType = z.infer<
  typeof CreateApplicationValidator
>;
