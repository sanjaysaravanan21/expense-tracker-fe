export const convertDashedToCapitalized = (input: string): string => {
  return input
    .split("-") // Split the string by dashes
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with spaces
};

export const convertTo24HourFormat = (time: string): string | null => {
  // Regular expression to match AM/PM time format
  const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) ?([AP]M)$/i;

  const match = time.match(regex);
  if (!match) {
    return null; // Return null if the input format is invalid
  }

  let hours = parseInt(match[1], 10); // Get the hours part
  const minutes = match[2]; // Get the minutes part
  const period = match[3].toUpperCase(); // Get the AM/PM part

  // Convert hours based on AM/PM
  if (period === "PM" && hours < 12) {
    hours += 12; // Convert PM hours to 24-hour format
  } else if (period === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 0 hours
  }

  // Format hours to always be two digits
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes}`; // Return the formatted time
};

export const getRandomColor = (): string => {
  const letters: string = "0123456789ABCDEF";
  let color: string = "#";
  for (let i: number = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
