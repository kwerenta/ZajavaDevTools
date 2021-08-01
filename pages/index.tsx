import Head from "next/head";
import React, { useState } from "react";
import CharacterItem from "../components/list/CharacterItem";
import Header from "../components/Header";
import Layout from "../components/Layout";
import ListContainer from "../components/list/ListContainer";
import Wrapper from "../components/Wrapper";
import AddCharacterForm from "../components/form/AddCharacterForm";
import { Character, useCharacter } from "../hooks/useCharacter";
import SkeletonItem from "../components/list/SkeletonItem";

export default function Home() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [characters, isLoading] = useCharacter();

  const handleOpenForm = () => {
    setIsFormOpened(true);
  };
  const handleCloseForm = () => {
    setIsFormOpened(false);
  };
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools</title>
      </Head>
      <Wrapper>
        {isFormOpened && <AddCharacterForm handleClose={handleCloseForm} />}
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
              : "Brak danych"
            : [...Array(3)].map((_, idx) => <SkeletonItem key={idx} />)}
        </ListContainer>
      </Wrapper>
    </Layout>
  );
}
