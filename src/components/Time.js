// Get current date in "Month Day, Year" format
function getCurrentDate() {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return today.toLocaleDateString("en-US", options); // "January 4, 2026"
}
// Get estimated date by adding days (e.g., 2 days later)
function getEstimatedDate(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options); // "January 6, 2026"
}