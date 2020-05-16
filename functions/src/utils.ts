/**
 * Function to parse a Date and display in a readable way
 */
export function parseDate(date: string): string {
  let parsedDate: Array<string>;
  console.log(date);
  try {
    parsedDate = date.split("T")[0].split("-");
  } catch (err) {
    return "error";
  }
  return parsedDate.reverse().join("/");
}
