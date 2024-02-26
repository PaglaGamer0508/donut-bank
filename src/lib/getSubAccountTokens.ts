import { hostName } from "./hostName";
import { Token } from "./types/token";

export const getSubAccountTokens = async (
  subAccountId: string
): Promise<Token[]> => {
  const tokensResponse = await fetch(
    `${hostName}/api/sub-account/token?subAccountId=${subAccountId}?apiKey=${process.env.API_KEY}`,
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
