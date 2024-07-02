import { getAuthSession } from "./auth";
import { db } from "./db";

export const hasBankAccount = async () => {
  const session = await getAuthSession();

  const hasBankAccount = await db.bankAccount.findFirst({
    where: {
      ownerId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });
  if (!hasBankAccount) {
    return false;
  } else {
    return true;
  }
};
