import { z } from "zod";

export const DeleteURLValidator = z.object({
  application_id: z.string(),
});

export type DeleteURLValidatorType = z.infer<typeof DeleteURLValidator>;
