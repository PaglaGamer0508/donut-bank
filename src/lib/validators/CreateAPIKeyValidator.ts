import { z } from "zod";

export const CreateAPIKeyValidator = z.object({
  applicationId: z.string(),
});

export type CreateAPIKeyValidatorType = z.infer<typeof CreateAPIKeyValidator>;
