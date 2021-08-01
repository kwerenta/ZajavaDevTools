import React, { ReactElement } from "react";

export default function SkeletonItem(): ReactElement {
  return (
    <li>
      <article className="gap-8 min-h-[5.5rem] w-full px-6 py-4 rounded-lg bg-zajavaBlue-800 animate-pulse opacity-40"></article>
    </li>
  );
}
