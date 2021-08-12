import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import Backdrop from "../Backdrop";

interface Props {
  children: React.ReactNode;
  handleClose: () => void;
}

export default function AsideFormContainer({
  children,
  handleClose,
}: Props): ReactElement {
  return (
    <>
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-110%" }}
        className="fixed lg:left-24 z-20 top-20 lg:top-0 left-0 bottom-0 md:max-w-2xl w-full md:p-16 p-20 bg-zajavaBlue-900"
      >
        {children}
      </motion.aside>
      <Backdrop handleClose={handleClose} />
    </>
  );
}
