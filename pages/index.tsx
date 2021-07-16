import Head from "next/head";
import Layout from "../components/Layout";
import Main from "../components/Main";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools</title>
      </Head>
      <Main>
        <h1>Contnet</h1>
      </Main>
    </Layout>
  );
}
