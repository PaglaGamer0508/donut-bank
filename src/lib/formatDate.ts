export const formatDate = (inputDate: Date): string => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear() === currentYear ? "" : date.getFullYear();

  return `${day} ${month} ${year}`;
};
