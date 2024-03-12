import moment from "moment";
const MINDAYSRETORECEIVE = 25;

export const getScannerMedicineIsInvalid = (date, total, current) => {
  if (total <= 0) {
    return true;
  } else if (date) {
    const days = moment(date).diff(moment(), "days");
    if (current < total && days >= MINDAYSRETORECEIVE) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
