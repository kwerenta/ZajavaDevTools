import { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Wrapper({ children }: Props): ReactElement {
  return (
    <main className="w-full flex-1 flex flex-col container mx-auto max-w-screen-md py-16 px-6 text-white">
      {children}
    </main>
  );
}
