import moment from "moment";

export const formatDateRange = (start, end) => {
  const dateFrom = moment(start);
  const dateTo = moment(end);

  const formattedDateFrom = dateFrom.format("MMMM D");
  const formattedDateTo = dateTo.format(dateFrom.month() === dateTo.month() ? "D" : "MMMM D");
  const year = dateFrom.year();

  return `${formattedDateFrom} - ${formattedDateTo}, ${year}`;
};

export const enumerateDates = (startDate, endDate) => {
  var now = moment(startDate),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("YYYY-MM-DD"));
    now.add(1, "days");
  }
  return dates; // August 10 - 11, 2023 || August 30 - September 03, 2023
};

export const formatTimeRange = (dateFrom, dateTo) => {
  const timeFrom = dateFrom.format("h:mmA");
  const timeTo = dateTo.format("h:mmA");

  return `${timeFrom} - ${timeTo}`;
};
