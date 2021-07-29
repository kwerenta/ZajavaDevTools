import React, { ReactElement } from "react";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import AddIcon from "./icons/AddIcon";
import Button from "./Button";

interface Props {
  title: string;
  createButtonText: string;
  createButtonFn: () => void;
}

export default function Header({
  title,
  createButtonText,
  createButtonFn,
}: Props): ReactElement {
  return (
    <header className="flex items-center mb-20">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="ml-auto flex gap-6">
        <button className="flex gap-2 items-center px-4 rounded-3xl hover:bg-white/10 transition-colors duration-300">
          <span className="text-sm font-semibold">Sortowanie</span>
          <ChevronDownIcon />
        </button>
        <Button onClick={createButtonFn}>
          <AddIcon /> {createButtonText}
        </Button>
      </div>
    </header>
  );
}
