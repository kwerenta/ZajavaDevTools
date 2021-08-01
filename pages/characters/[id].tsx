import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { ReactElement } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import QuestItem from "../../components/list/QuestItem";
import Wrapper from "../../components/Wrapper";
import { useCharacter } from "../../hooks/useCharacter";

export default function Character(): ReactElement {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id || "";
  console.log(id);
  const [characters] = useCharacter();

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
        <section>
          <ul className="flex flex-col gap-4 mt-20">
            <QuestItem />
          </ul>
        </section>
      </Wrapper>
    </Layout>
  );
}
