export const generateApplicationId = () => {
  const length = 16;
  const prefix = "a";

  const randomChars = Array.from({ length: length - 1 }, () => {
    const randomType = Math.random() < 0.5 ? "letter" : "number";
    if (randomType === "letter") {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    } else {
      return Math.floor(Math.random() * 10).toString();
    }
  }).join("");

  const applicationId = prefix + randomChars;

  return applicationId;
};
