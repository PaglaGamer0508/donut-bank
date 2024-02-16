import { hostName } from "./hostName";
import { SubAccount } from "./types/sub-account";

export const getSubAccount = async (
  subAccountId: string
): Promise<SubAccount | null> => {
  const subAccountResponse = await fetch(
    `${hostName}/api/sub-account/${subAccountId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (subAccountResponse.status === 404) {
    return null;
  }

  const subAccountData = await subAccountResponse.json();
  const { subAccount } = subAccountData;
  return subAccount;
};
