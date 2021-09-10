import React, { ReactElement } from "react";
import { Quest } from "../../contexts/QuestContext";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import ListItem from "./ListItem";

interface Props {
  quest: Quest;
}

export default function QuestItem({ quest }: Props): ReactElement {
  return (
    <ListItem cols={4} href="">
      <h2 className="font-bold text-lg col-span-3">{quest.name}</h2>
      <span className="flex justify-between items-center">
        <span>{quest.status}</span>
        <ChevronRightIcon />
      </span>
    </ListItem>
  );
}
