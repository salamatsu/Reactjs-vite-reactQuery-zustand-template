import moment from "moment";
import { CARDDATESTATUS, CARDDATESTATUSENUMS } from "../constants/enums";

export const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const removeDuplicate = (array, key) => {
  return array.reduce((acc, item) => {
    if (!acc.some((obj) => obj[key] === item[key])) {
      acc.push(item);
    }
    return acc;
  }, []);
};

export const groupArrayByKey = (arr, key) => {
  return Object.groupBy(arr, (obj) => obj[key]);
};

// Removes item when existing array 2
export const filterArrayFromArray = (array, array2, arr1Key, arr2Key) => {
  return array.filter(
    (obj) => !array2.find((obj2) => obj[arr1Key] == obj2[arr2Key])
  );
};

export const getCurrentDataByDate = (arr = [], key = "") => {
  return arr.filter((obj) =>
    moment().isSameOrBefore(moment(obj[key], "YYYY-MM-DD"))
  );
};

export const getExpiredDataByDate = (arr = [], key = "") => {
  const result = arr.filter((obj) =>
    moment(obj[key], "YYYY-MM-DD").isAfter(moment())
  );
  return result;
};

export const getCardStatusByDate = (date) => {
  const currentDate = moment().format("YYYY-MM-DD");
  return moment(currentDate).isBefore(moment(date))
    ? CARDDATESTATUS.ONGOING
    : CARDDATESTATUS.EXPIRED;
};
// export const getCardStatusByDate_1 = (date) => {
//   const currentDate = moment().format("YYYY-MM-DD");
//   return moment(moment(currentDate).add(1, "d")).isSame(moment(date))
//     ? CARDDATESTATUS.LASTDAY
//     : moment(currentDate).isBefore(moment(date))
//     ? CARDDATESTATUS.ONGOING
//     : CARDDATESTATUS.EXPIRED;
// };

export const getCountByStatusDateAndKey = (arr = [], key) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const result = arr.reduce(
    (accumulator, currentValue) => {
      if (moment(currentDate).isBefore(moment(currentValue[key]))) {
        accumulator[CARDDATESTATUSENUMS.ONGOING].push(currentValue);
      } else {
        moment(currentDate).isAfter(moment(currentValue[key]));
        accumulator[CARDDATESTATUSENUMS.EXPIRED].push(currentValue);
      }
      return accumulator;
    },
    {
      [CARDDATESTATUSENUMS.ONGOING]: [],
      [CARDDATESTATUSENUMS.EXPIRED]: [],
    }
  );

  return result;
};

// export const getCountByStatusDateAndKey_V1 = (arr = [], key) => {
//   const currentDate = moment().format("YYYY-MM-DD");
//   const result = arr.reduce(
//     (accumulator, currentValue) => {
//       if (
//         moment(moment(currentDate).add(1, "d")).isSame(
//           moment(currentValue[key])
//         )
//       ) {
//         accumulator[CARDDATESTATUSENUMS.LASTDAY].push(currentValue);
//       } else if (moment(currentDate).isBefore(moment(currentValue[key]))) {
//         accumulator[CARDDATESTATUSENUMS.ONGOING].push(currentValue);
//       } else {
//         moment(currentDate).isAfter(moment(currentValue[key]));
//         accumulator[CARDDATESTATUSENUMS.EXPIRED].push(currentValue);
//       }
//       return accumulator;
//     },
//     {
//       [CARDDATESTATUSENUMS.LASTDAY]: [],
//       [CARDDATESTATUSENUMS.ONGOING]: [],
//       [CARDDATESTATUSENUMS.EXPIRED]: [],
//     }
//   );

//   return result;
// };
