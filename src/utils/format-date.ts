const formatDateAndTime = (date: Date | string | number): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }

  const padZero = (num: number) => num.toString().padStart(2, "0");

  const month = padZero(dateObj.getMonth() + 1);
  const day = padZero(dateObj.getDate());
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());
  const seconds = padZero(dateObj.getSeconds());

  return `${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export { formatDateAndTime };
