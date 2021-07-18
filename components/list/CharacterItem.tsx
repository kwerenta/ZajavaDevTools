import React, { ReactElement } from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import ListItem from "./ListItem";

interface Props {}

export default function CharacterItem({}: Props): ReactElement {
  return (
    <ListItem cols={3}>
      <h2 className="font-bold text-lg">Nazwa postaci</h2>
      <span>Zajęcie</span>
      <span className="flex justify-between items-center">
        <span>Lokalizacja</span>
        <ChevronRightIcon />
      </span>
    </ListItem>
  );
}
