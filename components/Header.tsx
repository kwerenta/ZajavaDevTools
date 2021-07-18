import React, { ReactElement } from "react";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import AddIcon from "./icons/AddIcon";

interface Props {
  title: string;
  createButtonText: string;
}

export default function Header({
  title,
  createButtonText,
}: Props): ReactElement {
  return (
    <header className="flex items-center">
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl">{title}</h1>
      </div>
      <div className="ml-auto flex gap-6">
        <button className="flex gap-2 items-center px-4 rounded-3xl hover:bg-white/10 transition-colors duration-300">
          <span className="text-sm font-semibold">Sortowanie</span>
          <ChevronDownIcon />
        </button>
        <button className="flex gap-2 items-center rounded-3xl px-4 py-3 bg-zajavaBlue-600 hover:bg-zajavaBlue-700 duration-300 transition-colors">
          <AddIcon />
          <span className="text-sm font-semibold">{createButtonText}</span>
        </button>
      </div>
    </header>
  );
}
