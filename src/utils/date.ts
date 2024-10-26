export const getCurrentDate = () => {
  const now = Date.now(); // Get current timestamp in milliseconds
  const today = new Date(now); // Create a Date object from the timestamp

  // Format to only include the date part (YYYY-MM-DD)
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
