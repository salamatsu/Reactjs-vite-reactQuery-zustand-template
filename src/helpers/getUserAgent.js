import { USERAGENT } from "../constants/enums";

export const getUSERAGENT = () => {
  const ua = navigator.USERAGENT;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return USERAGENT.TABLET;
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return USERAGENT.MOBILE;
  } else {
    return USERAGENT.WEB;
  }
};
