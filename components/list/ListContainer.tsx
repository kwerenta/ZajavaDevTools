import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ListContainer({ children }: Props): ReactElement {
  return (
    <section>
      <ul className="flex flex-col gap-4">{children}</ul>
    </section>
  );
}
