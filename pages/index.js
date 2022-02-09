import { useState } from "react";
import Head from "next/head";
import Card from "../components/Card";
import styled from "styled-components";
import CardSearch from "../components/CardSearch";

export default function Home() {
  const [cards, setCards] = useState();

  return (
    <PageWrapper>
      <Head>
        <title>Card Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CardSearch setCards={setCards} />
      {cards ? <Card card={cards} /> : null}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
