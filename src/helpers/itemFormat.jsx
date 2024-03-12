import { Typography } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const getItem = (label, key, icon, children, ...props) => {
  return {
    key,
    icon,
    children,
    label,
    ...props,
  };
};

export const viewHandler = (value) => (value ? value : "N/A");

export const viewHandlerCopyable = (value) =>
  value ? <Typography.Text copyable>{value}</Typography.Text> : "N/A";

export const generateItems = (arr = []) => {
  return arr.map((obj) =>
    getItem(
      <motion.div
        variants={{
          offscreen: { y: -200, opacity: 0 },
          onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", bounce: 0.2, duration: 1 },
          },
        }}
        whileHover={{
          x: 10,
          shadow: 20,
        }}
      >
        <Link to={obj.link}>{obj.label}</Link>
      </motion.div>,
      obj.link,

      <Link to={obj.link}>{obj.icon}</Link>
    )
  );
};

export const getSex = (data) => {
  if (data == 0) {
    return "Male";
  } else if (data == 1) {
    return "Female";
  } else {
    return "N/A";
  }
};
