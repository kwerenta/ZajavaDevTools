import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { ReactElement } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import ListContainer from "../../components/list/ListContainer";
import QuestItem from "../../components/list/QuestItem";
import SkeletonItem from "../../components/list/SkeletonItem";
import Wrapper from "../../components/Wrapper";
import { useCharacter } from "../../contexts/CharacterContext";
import { Quest, useQuest } from "../../contexts/QuestContext";

export default function Character(): ReactElement {
  const { query } = useRouter();
  const id = query.id;
  const { characters } = useCharacter();
  const { isLoading, quests, error } = useQuest();

  const character = characters.find(char => char.uid === id) || {
    name: "",
    uid: "",
  };
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools | {character.name}</title>
      </Head>
      <Wrapper>
        <Header
          title={character.name}
          createButtonText="Dodaj zadanie"
          createButtonFn={() => ({})}
        />
        <ListContainer>
          {!isLoading
            ? quests.length
              ? quests.map((quest: Quest) => (
                  <QuestItem key={quest.uid} quest={quest} />
                ))
              : (
                  <span className="text-red-400 font-bold">{`Wystąpił błąd: ${error}`}</span>
                ) || "Brak danych"
            : [...Array(5)].map((_, idx) => <SkeletonItem key={idx} />)}
        </ListContainer>
      </Wrapper>
    </Layout>
  );
}
