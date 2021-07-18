import Head from "next/head";
import React from "react";
import CharacterItem from "../components/list/CharacterItem";
import Header from "../components/Header";
import Layout from "../components/Layout";
import ListContainer from "../components/list/ListContainer";
import Wrapper from "../components/Wrapper";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools</title>
      </Head>
      <Wrapper>
        <Header title="Postacie" createButtonText="Utwórz postać" />
        <ListContainer>
          {[0, 1, 2, 3].map((_, idx) => (
            <CharacterItem key={idx} />
          ))}
        </ListContainer>
      </Wrapper>
    </Layout>
  );
}
