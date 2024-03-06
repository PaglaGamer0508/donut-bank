import { z } from "zod";

export const DeleteSubAccountTokenValidator = z.object({
  subAccountId: z.string(),
  tokenId: z.string(),
});

export type DeleteSubAccountTokenValidatorType = z.infer<
  typeof DeleteSubAccountTokenValidator
>;
