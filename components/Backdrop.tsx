import { motion } from "framer-motion";
import React, { ReactElement } from "react";

interface Props {
  handleClose: () => void;
}

export default function Backdrop({ handleClose }: Props): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed lg:ml-24 inset-0 z-10 bg-black/40"
      onClick={handleClose}
    ></motion.div>
  );
}
