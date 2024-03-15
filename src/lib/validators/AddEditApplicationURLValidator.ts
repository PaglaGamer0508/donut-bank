import { z } from "zod";

export const AddEditApplicationURLValidator = z.object({
  url: z.string().url(),
  application_id: z.string(),
});

export type AddEditApplicationURLValidatorType = z.infer<
  typeof AddEditApplicationURLValidator
>;
