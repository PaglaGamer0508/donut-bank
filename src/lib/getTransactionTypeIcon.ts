import { TransactionType } from "./types/transaction";
import DepositIcon from "@/../public/transaction-icons/deposit.svg";
import WithdrawIcon from "@/../public/transaction-icons/withdraw.svg";
import SendMoneyIcon from "@/../public/transaction-icons/send-money.svg";
import AddMoneyIcon from "@/../public/transaction-icons/add-money.svg";
import SpendMoneyIcon from "@/../public/transaction-icons/spend-money.svg";
import ReceivedIcon from "@/../public/transaction-icons/received-money.svg";
import { StaticImageData } from "next/image";

export const getTransactionTypeIcon = (
  transactionType: TransactionType
): StaticImageData | undefined => {
  if (transactionType === TransactionType.DEPOSIT) {
    return DepositIcon;
  }
  if (transactionType === TransactionType.WITHDRAW) {
    return WithdrawIcon;
  }
  if (transactionType === TransactionType.SEND) {
    return SendMoneyIcon;
  }
  if (transactionType === TransactionType.RECEIVED) {
    return ReceivedIcon;
  }
  if (transactionType === TransactionType.ADD) {
    return AddMoneyIcon;
  }
  if (transactionType === TransactionType.SPEND) {
    return SpendMoneyIcon;
  } else {
    return undefined;
  }
};
