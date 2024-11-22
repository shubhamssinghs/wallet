/**
 * Filters a dataset to include only entries where the `date` matches today's date.
 *
 * @param {Array} data - Array of objects, each containing a `date` property.
 * @returns {Array} Filtered array of objects with dates matching today.
 *
 * Example usage:
 * const todayTransactions = filterByTodayDate(transactions);
 */
export function filterByTodayDate(data) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return entryDate === today;
  });

  return filteredData;
}

/**
 * Groups transactions by year and month, providing summary information.
 *
 * @param {WalletTransaction[]} transactions - Array of wallet transactions.
 * @returns {Object} An object where each key represents a year-month grouping,
 * and the value contains metadata and transactions for that group.
 *
 * Example structure of output:
 * {
 *   "2024-March": {
 *     year: 2024,
 *     month: "March",
 *     totalTransactions: 5,
 *     transactions: [ ... ] // Array of transactions
 *   }
 * }
 */
export const groupTransactionsByMonth = (transactions) => {
  return transactions.reduce((groupedTransactions, transaction) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const yearMonth = `${year}-${month}`;

    if (!groupedTransactions[yearMonth]) {
      groupedTransactions[yearMonth] = {
        year,
        month,
        totalTransactions: 0,
        transactions: [],
      };
    }

    groupedTransactions[yearMonth].transactions.push(transaction);
    groupedTransactions[yearMonth].totalTransactions += 1;

    return groupedTransactions;
  }, {});
};

/**
 * Formats a date-time string into an object containing various date-time components.
 *
 * @param {string} dateTimeString - A valid date-time string.
 * @returns {Object} Object with formatted components such as day, month, year, time, etc.
 *
 } Object with formatted components such as day, month, year, time, etc.
 *
 * Throws an error if the input date string is invalid.
 *
 * @example:
 * Input: "2024-03-05T15:30:45.123Z"
 * Output:
 * {
 *    dd: "05",         // Day of the month, two digits
 *    DD: "05",         // Alias for 'dd'
 *    ddd: "Tue",       // Short name of the day of the week
 *    dddd: "Tuesday",  // Full name of the day of the week
 *    mm: "30",         // Minutes, two digits
 *    MM: "03",         // Month as a number, two digits
 *    MMM: "Mar",       // Short name of the month
 *    MMMM: "March",    // Full name of the month
 *    yyyy: 2024,       // Full year
 *    HH: "15",         // 24-hour format hour, two digits
 *    hh: "03",         // 12-hour format hour, two digits
 *    ss: "45",         // Seconds, two digits
 *    ms: "123",        // Milliseconds, three digits
 *    AMPM: "PM",       // AM/PM indicator
 * }
 */
export const formatDateTimeAsObject = (dateTimeString) => {
  const date = new Date(dateTimeString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysLong = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeekShort = daysShort[date.getDay()];
  const dayOfWeekLong = daysLong[date.getDay()];
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const monthShort = monthsShort[date.getMonth()];
  const monthLong = monthsLong[date.getMonth()];
  const year = date.getFullYear();
  const hours24 = String(date.getHours()).padStart(2, "0");
  const hours12 = String(date.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return {
    dd: day,
    DD: day,
    ddd: dayOfWeekShort,
    dddd: dayOfWeekLong,
    mm: minutes,
    MM: month,
    MMM: monthShort,
    MMMM: monthLong,
    yyyy: year,
    HH: hours24,
    hh: hours12,
    ss: seconds,
    ms: milliseconds,
    AMPM: ampm,
  };
};

/**
 * Formats a date string into "dd-MM-yyyy" format.
 *
 * @param {string} dateString - A valid date string.
 * @returns {string} Formatted date string in "dd-MM-yyyy".
 */
export const formatDate = (dateString) => {
  const obj = formatDateTimeAsObject(dateString);
  return `${obj.dd}-${obj.MM}-${obj.yyyy}`;
};

/**
 * Formats a date-time string into a human-readable format.
 *
 * @param {string} dateTimeString - A valid date-time string.
 * @returns {string} Friendly formatted string, e.g., "05-Mar-2024 at 03:15 PM".
 */
export const formatFriendlyDateTime = (dateTimeString) => {
  const obj = formatDateTimeAsObject(dateTimeString);
  return `${obj.dd}-${obj.MMM}-${obj.yyyy} at ${obj.hh}:${obj.mm} ${obj.AMPM}`;
};
