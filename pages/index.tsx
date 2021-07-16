import Head from "next/head";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import ChevronDownIcon from "../components/icons/ChevronDownIcon";
import UserAddIcon from "../components/icons/UserAddIcon";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ZajavaDevTools</title>
      </Head>
      <Wrapper>
        <header className="flex items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl">Postacie</h1>
            <p className="text-sm">
              W sumie jest <span className="font-semibold">9</span> postaci.
            </p>
          </div>
          <div className="ml-auto flex gap-6">
            <button className="flex gap-2 items-center px-4 rounded-3xl hover:bg-white/10 transition-colors">
              <span className="text-sm font-semibold">Filtruj</span>
              <ChevronDownIcon />
            </button>
            <button className="flex gap-2 items-center rounded-3xl px-4 py-3 bg-zajavaBlue-600 hover:bg-zajavaBlue-700 duration-300 transition-colors">
              <UserAddIcon />
              <span className="text-sm font-semibold">Utwórz postać</span>
            </button>
          </div>
        </header>
        <section className="flex flex-col gap-4 mt-20">
          <article>Postać 1</article>
        </section>
      </Wrapper>
    </Layout>
  );
}
