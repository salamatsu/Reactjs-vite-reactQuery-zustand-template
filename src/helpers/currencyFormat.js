export const format_addCommas = (num) => {
  var str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  return str.join(".");
};

const formatCurency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

const formatCurency3 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 3,
});

export const format_PHCurrency = (num) => formatCurency.format(num);
export const checkFree = (num) =>
  num === 0 ? "FREE" : formatCurency.format(num);
export const format_PHCurrency3 = (num) => formatCurency3.format(num);
export const unFormat_PHCurrency = (num = "") =>
  Number(num.replace(/[^0-9\\.]+/g, ""));

export const getPercentage = (partialValue, totalValue) => {
  return ((100 * partialValue) / totalValue).toFixed(2);
};
