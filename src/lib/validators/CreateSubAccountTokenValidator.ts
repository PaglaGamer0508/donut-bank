import { z } from "zod";

export const CreateSubAccountTokenValidator = z.object({
  subAccountId: z.string(),
  applicationId: z.string(),
  limit: z.number().int(),
});

export type CreateSubAccountTokenValidatorType = z.infer<
  typeof CreateSubAccountTokenValidator
>;
