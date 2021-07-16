import Head from "next/head";
import React, { ReactElement } from "react";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <div className="min-h-screen min-w-screen bg-zajavaBlue-900 flex flex-col lg:flex-row">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Tools for ZajavaCraft developers" />
      </Head>
      <Navigation />
      {children}
    </div>
  );
}
