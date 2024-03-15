export const isValidURL = (url: string) => {
  const pattern = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
  return pattern.test(url);
};
