import moment from "moment";
import { MINDAYSRETORECEIVE } from "../constants/static";
import { viewHandlerCopyable } from "./itemFormat";

export const formatNavigations = (arr) => {
  return Object.entries(arr)
    .reduce((acc, [key, data]) => {
      const newData = data.map((obj) => ({ ...obj, module: key }));
      acc.push(newData);
      return acc;
    }, [])
    .flat();
};

export const arrayToSelectDropdown = (arr, keyValue, keyLabel) => {
  return arr.map((obj) => ({ label: obj[keyLabel], value: obj[keyValue] }));
};

export const getBirthdate = (month, day, year) => {
  if (month && day && year) {
    const date = moment(`${month} ${day}, ${year}`, "MMMM D, YYYY");

    return date.isValid() ? date.format("YYYY-MM-DD") : "";
  } else {
    return "";
  }
};

export const decodeHtmlEntities = (html, isCopyable = false) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return isCopyable ? viewHandlerCopyable(txt.value) : txt.value;
};

export const sortArrayObjects = (arr, key, type = "desc") => {
  return arr.sort((a, b) => {
    if (type == "desc") {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
    } else {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
    }
    return 0;
  });
};

export const scannerAddStatusOnCitizenMedicines = (data) => {
  return {
    ...data,
    medicines: (data?.medicines || []).map((obj) => {
      const monthlyQty = parseInt(obj.quantity || 0);
      const receivedQty = parseInt(obj.receivedQty || 0);
      let isInvalid = true;
      let errorMessage = "";
      let formValue = null;
      let maxQuantity = null;
      let remainingDays = 0;

      if (obj.status == 0) {
        isInvalid = false;
        formValue = monthlyQty;
      } else if (obj.status == 1) {
        const days = moment().diff(moment(obj.dateDistributed), "days");
        if (receivedQty < monthlyQty && days < MINDAYSRETORECEIVE) {
          isInvalid = false;
          formValue = monthlyQty - receivedQty;
          maxQuantity = monthlyQty - receivedQty;
          errorMessage = `Have received total of ${receivedQty} last ${moment(
            obj.dateDistributed
          ).format("ll")}`;
        } else if (days < MINDAYSRETORECEIVE) {
          remainingDays = MINDAYSRETORECEIVE - days;
          errorMessage = `${remainingDays} days left to get another medicine.(${moment()
            .add(remainingDays, "day")
            .format("ll")})`;
        } else {
          isInvalid = false;
          formValue = monthlyQty;
          maxQuantity = monthlyQty;
        }
      } else {
        const days = moment().diff(moment(obj.dateDistributed), "days");
        remainingDays = MINDAYSRETORECEIVE - days;
        if (days < MINDAYSRETORECEIVE) {
          errorMessage = `${remainingDays} days left to get another medicine.(${moment()
            .add(remainingDays, "day")
            .format("ll")})`;
        } else {
          isInvalid = false;
          formValue = monthlyQty;
        }
      }

      return {
        ...obj,
        isInvalid,
        maxQuantity,
        errorMessage,
        formValue,
        remainingDays,
      };
    }),
  };
};

export const getAllMedicines = (data = []) => {
  const result = data
    .reduce((acc, item) => {
      acc.push(...(item?.medicines || []));
      return acc;
    }, [])
    .map((obj) => ({ ...obj, quantity: obj.monthlyQuantity }))
    .reduce((acc, item) => {
      const isExist = acc.find((obj) => obj.productId === item.productId);
      if (isExist) {
        acc = acc.map((obj) => {
          if (obj.productId === item.productId) {
            return { ...obj, quantity: obj.quantity + item.quantity };
          } else {
            return obj;
          }
        });
      } else {
        acc.push(item);
      }

      return acc;
    }, []);

  return result;
};

export const getAge = (birthdate) => {
  return moment().diff(birthdate, "years");
};
