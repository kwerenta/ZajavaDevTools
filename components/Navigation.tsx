import React, { ReactElement } from "react";

interface Props {}

export default function Navigation({}: Props): ReactElement {
  return (
    <nav className="sticky top-0 z-20 flex items-center lg:flex-col lg:rounded-r-3xl bg-zajavaBlue-800">
      <div className="rounded-r-3xl w-20 h-20 lg:w-24 lg:h-24 bg-zajavaBlue-500">LOGO</div>
    </nav>
  );
}
