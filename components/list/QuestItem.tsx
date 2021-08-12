import React, { ReactElement } from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import ListItem from "./ListItem";

interface Props {}

export default function QuestItem({}: Props): ReactElement {
  return (
    <ListItem cols={4} href="">
      <h2 className="font-bold text-lg col-span-3">Nazwa zadania</h2>
      <span className="flex justify-between items-center">
        <span>Status</span>
        <ChevronRightIcon />
      </span>
    </ListItem>
  );
}
