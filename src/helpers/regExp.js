// Password
export const passwordSmallLetter = new RegExp(/[a-z]/g);
export const passwordCapitalLetter = new RegExp(/[A-Z]/g);
export const passwordNumber = new RegExp(/[0-9]/g);
export const passwordSpecialChar = new RegExp(/[!@#$%^&)(+=.-]/g);
export const passwordLength = new RegExp(/[a-zA-Z0-9!@#$%^&)(+=.-]{6}/g);
//

export const regExp_Names = new RegExp(/^[a-zA-Z\s]+$/);
export const regExp_StudentId = new RegExp(/^\d{4}-\d{2}-\d{6}$/);
export const regExp_Username = new RegExp(/^[a-zA-Z0-9\s]+$/);
export const regExp_MobileNumber = new RegExp(/^[9][0-9]{9}$/);
export const regExp_Email = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
);
