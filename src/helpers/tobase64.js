import * as xlsx from "xlsx";

// File to base64
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertToBase64 = async (file) => {
  try {
    const result = await toBase64(file);
    return result;
  } catch (error) {
    alert("Image convertion failed. Please try again or contact support.");
    return;
  }
};

// URL to base64
export const imageToBase64 = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const base64 = canvas.toDataURL("image/png");
      resolve(base64);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
  });
};

export const fileCSVToJSON = (file) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
        resolve(json); // Resolve the promise with the JSON data
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject("File is not provided."); // Reject the promise if no file is provided
    }
  });
};

export const validateSheetJsonKeys = (filePath, keys, data = []) => {
  // STATUS
  // 0 : invalid file
  // -1 : Invalid Data columns
  // 1 : valid data

  var allowedExtensions = /(\.xlsx|\.csv|\.xls)$/i;
  if (!allowedExtensions.exec(filePath)) {
    return 0;
  } else {
    let errArr = [];
    let errKeys = [];

    keys.map((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (data?.[0]?.hasOwnProperty(key)) {
        errArr.push(true);
        errKeys.push(key);
      } else {
        errArr.push(false);
      }
    });

    if (errArr.includes(false)) {
      return -1;
    } else {
      return 1;
    }
  }
};
