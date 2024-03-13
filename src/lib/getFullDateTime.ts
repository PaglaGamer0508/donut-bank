export const getFullDateTime = (dateTimeString: Date): string => {
  const dateTime = new Date(dateTimeString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return dateTime.toLocaleString(undefined, options);
};
