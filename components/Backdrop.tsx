import React, { ReactElement } from "react";

interface Props {
  handleClose: () => void;
}

export default function Backdrop({ handleClose }: Props): ReactElement {
  return (
    <div
      className="fixed lg:ml-24 inset-0 z-10 bg-black/40"
      onClick={handleClose}
    ></div>
  );
}
