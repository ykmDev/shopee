export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getTimePeriod = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const timePeriodMs = endDate - startDate;
  const timePeriodDays = timePeriodMs / (1000 * 60 * 60 * 24);

  return timePeriodDays;
};
