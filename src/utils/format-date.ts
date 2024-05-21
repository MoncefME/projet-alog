const formatDateAndTime = (date: Date | string | number): string => {
  // Convert the date to a Date object
  const dateObj = new Date(date);

  // Check if the date is invalid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }

  // Helper function to pad single digit numbers with a leading zero
  const padZero = (num: number) => num.toString().padStart(2, "0");

  // Get the individual components of the date
  const month = padZero(dateObj.getMonth() + 1);
  const day = padZero(dateObj.getDate());
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());
  const seconds = padZero(dateObj.getSeconds());

  // Return the formatted date string
  return `${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export { formatDateAndTime };
