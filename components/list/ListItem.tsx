import Link from "next/link";
import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
  cols: 2 | 3 | 4;
}

export default function ListItem({ children, cols }: Props): ReactElement {
  const gridCols =
    cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <li>
      <Link href="/characters/nazwa-postaci" passHref>
        <a>
          <article
            className={`${gridCols} grid gap-8 min-h-[5.5rem] items-center w-full px-6 py-4 bg-zajavaBlue-800 rounded-lg transition-shadow duration-300 hover:ring-2 hover:ring-zajavaBlue-500`}
          >
            {children}
          </article>
        </a>
      </Link>
    </li>
  );
}
