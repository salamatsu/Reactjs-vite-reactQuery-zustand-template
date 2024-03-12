import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
export const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

export const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

export const customDisabledDate = (current, startDate, endDate) => {
  if (!startDate || !endDate) {
    // Allow all dates if either startDate or endDate is not selected
    return false;
  }

  // Disable dates before startDate and after endDate
  return current < startDate || current > endDate;
};

export const disabledRangeTime = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

//disable dates onwards starts on given date
export const isDateDisabledOnwards = (current, givenDate) => {
  return givenDate && current && current >= dayjs(givenDate);
};

export const disabledFutureDates = (current) => {
  // Disable future dates
  return current && current > dayjs().endOf("day");
};

export const enabledRangeDates = (start, end) => {
  // Disable future dates
  return start && start < dayjs().endOf("day") && end > dayjs().endOf("day");
};
