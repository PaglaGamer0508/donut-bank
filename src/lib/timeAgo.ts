export const timeAgo = (date: Date | string): string => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const interval in intervals) {
    const count = Math.floor(seconds / intervals[interval]);
    if (count > 0) {
      return `${count} ${interval}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};
