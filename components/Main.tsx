import { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props): ReactElement {
  return <main className="w-full flex-1 flex">{children}</main>;
}
