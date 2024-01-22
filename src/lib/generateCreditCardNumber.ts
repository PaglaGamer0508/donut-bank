export const generateCreditCardNumber = () => {
  const min = 1e11;
  const max = 1e12 - 1;
  const randomDigits = Math.floor(
    Math.random() * (max - min + 1) + min
  ).toString();
  const generatedDigits = randomDigits.padStart(randomDigits.length, "0");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return `${generatedDigits}${currentYear}`;
};
