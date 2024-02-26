import { hostName } from "./hostName";
import { SubAccount } from "./types/sub-account";

export const getAllSubAccount = async (
  bankAccountId: string
): Promise<SubAccount[]> => {
  const subAccountResponse = await fetch(
    `${hostName}/api/sub-account?apiKey=${process.env.API_KEY}&bankAccountId=${bankAccountId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const subAccountData = await subAccountResponse.json();
  const { subAccounts } = subAccountData;
  return subAccounts;
};
