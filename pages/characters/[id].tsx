import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { ReactElement } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import ListContainer from "../../components/list/ListContainer";
import QuestItem from "../../components/list/QuestItem";
import Wrapper from "../../components/Wrapper";
import { useCharacter } from "../../contexts/CharacterContext";

export default function Character(): ReactElement {
  const { query } = useRouter();
  const id = query.id;
  const {
    state: { characters },
  } = useCharacter();

  const character = characters.find(char => char.uid === id) || {
    name: "",
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
          <QuestItem />
        </ListContainer>
      </Wrapper>
    </Layout>
  );
}
