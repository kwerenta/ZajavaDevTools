import React, { ReactElement } from "react";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import AddIcon from "./icons/AddIcon";
import Button from "./Button";
import { useCharacter } from "../contexts/CharacterContext";

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
  const { sortCharacters } = useCharacter();
  return (
    <header className="flex items-center mb-20">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="ml-auto flex gap-6">
        <Button
          variant="TRANSPARENT"
          onClick={() => sortCharacters("location")}
          className="flex gap-2 items-center px-4 rounded-3xl"
        >
          <span className="text-sm font-semibold">Sortuj</span>
          <ChevronDownIcon />
        </Button>
        <Button onClick={createButtonFn}>
          <AddIcon /> {createButtonText}
        </Button>
      </div>
    </header>
  );
}
