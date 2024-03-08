import { db } from "./db";
import { hostName } from "./hostName";

export const getBankAccountId = async (
  userId: string
): Promise<string | undefined> => {
  try {
    const bankAccountIdResponse = await fetch(
      `${hostName}/api/bank-account/id?apiKey=${process.env.API_KEY}&userId=${userId}`,
      {
        cache: "force-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const bankAccountIdData = await bankAccountIdResponse.json();

    const { bankAccountId } = bankAccountIdData;

    return bankAccountId;
  } catch (error) {
    console.error(error);
  } finally {
    db.$disconnect();
  }
};
