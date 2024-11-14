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

export function groupTransactionsByDate(data) {
  const groupedData = {};
  data.forEach((entry) => {
    const { date, ...rest } = entry;
    if (groupedData[date]) {
      groupedData[date].push(rest);
    } else {
      groupedData[date] = [rest];
    }
  });

  return groupedData;
}
