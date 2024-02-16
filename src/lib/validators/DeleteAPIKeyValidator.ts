import { z } from "zod";

export const DeleteAPIKeyValidator = z.object({
  apiKeyId: z.string(),
  applicationId: z.string(),
});

export type DeleteAPIKeyValidatorType = z.infer<typeof DeleteAPIKeyValidator>;
