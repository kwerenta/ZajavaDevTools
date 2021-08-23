import React, { ReactElement } from "react";
import { Character } from "../../contexts/CharacterContext";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import ListItem from "./ListItem";

interface Props {
  character: Character;
}

export default function CharacterItem({ character }: Props): ReactElement {
  return (
    <ListItem href={`/characters/${character.uid}`} cols={3}>
      <h2 className="font-bold text-lg truncate md:whitespace-normal">
        {character.name}
      </h2>
      <span>{character.occupation}</span>
      <span className="flex justify-between items-center">
        <span>{character.location}</span>
        <ChevronRightIcon />
      </span>
    </ListItem>
  );
}
