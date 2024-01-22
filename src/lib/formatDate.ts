export const formatDate = (inputDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const date = new Date(inputDate);
  const currentYear = new Date().getFullYear();

  if (date.getFullYear() === currentYear) {
    delete options.year;
  }

  return date.toLocaleDateString("en-US", options).replace(",", "");
};
