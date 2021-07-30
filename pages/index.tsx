import Head from "next/head";
import React, { useState } from "react";
import CharacterItem from "../components/list/CharacterItem";
import Header from "../components/Header";
import Layout from "../components/Layout";
import ListContainer from "../components/list/ListContainer";
import Wrapper from "../components/Wrapper";
import AddCharacterForm from "../components/form/AddCharacterForm";

export default function Home() {
  const [isFormOpened, setIsFormOpened] = useState(false);
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
          {[0, 1, 2, 3].map((_, idx) => (
            <CharacterItem key={idx} />
          ))}
        </ListContainer>
      </Wrapper>
    </Layout>
  );
}
