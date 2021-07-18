import { useRouter } from "next/dist/client/router";
import React, { ReactElement } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import QuestItem from "../../components/list/QuestItem";
import Wrapper from "../../components/Wrapper";

export default function Character(): ReactElement {
  const { query } = useRouter();
  const slug = Array.isArray(query.slug)
    ? query.slug[0]
    : query.slug || "Postać";
  return (
    <Layout>
      <Wrapper>
        <Header title={slug} createButtonText="Dodaj zadanie" />
        <section>
          <ul className="flex flex-col gap-4 mt-20">
            <QuestItem />
          </ul>
        </section>
      </Wrapper>
    </Layout>
  );
}
