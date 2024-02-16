import { z } from "zod";

export const CreateSubAccountTokenValidator = z.object({
  name: z.string().optional(),
  subAccountId: z.string(),
  applicationId: z.string(),
  limit: z.number().int(),
});

export type CreateSubAccountTokenValidatorType = z.infer<
  typeof CreateSubAccountTokenValidator
>;
