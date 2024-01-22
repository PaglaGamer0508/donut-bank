export const generateBankAccountId = () => {
  const bankAccountId = Math.floor(1000000000 + Math.random() * 9000000000);

  return bankAccountId.toString();
};
