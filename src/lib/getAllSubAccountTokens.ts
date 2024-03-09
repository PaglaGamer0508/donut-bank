import { hostName } from "./hostName";
import { Token } from "./types/token";

export const getAllSubAccountTokens = async (
  subAccountId: string
): Promise<Token[]> => {
  const tokensResponse = await fetch(
    `${hostName}/api/sub-account/token?apiKey=${process.env.API_KEY}&subAccountId=${subAccountId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const tokensData = await tokensResponse.json();

  const { tokens } = tokensData;

  return tokens;
};
