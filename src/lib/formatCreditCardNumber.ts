export const formatCreditCardNumber = (creditCardNumber: string) => {
  const regex = /\d{4}(?=\d)/g;
  const formattedNumber = creditCardNumber.replace(regex, "$&-");

  return formattedNumber;
};
