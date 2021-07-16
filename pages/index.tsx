import Head from "next/head";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools</title>
      </Head>
      <Wrapper>
        <header className="flex justify-between items-center">
          <span>Postacie</span>
        </header>
        <section>
          <article>Postać 1</article>
        </section>
      </Wrapper>
    </Layout>
  );
}
