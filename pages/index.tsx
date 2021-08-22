import Head from "next/head";
import React, { useState } from "react";
import CharacterItem from "../components/list/CharacterItem";
import Header from "../components/Header";
import Layout from "../components/Layout";
import ListContainer from "../components/list/ListContainer";
import Wrapper from "../components/Wrapper";
import CharacterForm from "../components/form/CharacterForm";
import SkeletonItem from "../components/list/SkeletonItem";
import { Character, useCharacter } from "../contexts/CharacterContext";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const {
    state: { isLoading, characters, error },
  } = useCharacter();
  const handleOpenForm = () => {
    setIsFormOpened(true);
  };
  const handleCloseForm = () => {
    setIsFormOpened(false);
  };
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools | Postacie</title>
      </Head>
      <Wrapper>
        <AnimatePresence>
          {isFormOpened && <CharacterForm handleClose={handleCloseForm} />}
        </AnimatePresence>
        <Header
          title="Postacie"
          createButtonText="Utwórz postać"
          createButtonFn={handleOpenForm}
        />
        <ListContainer>
          {!isLoading
            ? characters.length
              ? characters.map((character: Character) => (
                  <CharacterItem key={character.uid} character={character} />
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
