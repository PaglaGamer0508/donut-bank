import { hostName } from "./hostName";
import { SubAccount } from "./types/sub-account";

export const getSubAccount = async (userId: string): Promise<SubAccount> => {
  const subAccountResponse = await fetch(
    `${hostName}/api/sub-account/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const subAccountData = await subAccountResponse.json();
  const { subAccount } = subAccountData;
  return subAccount;
};
