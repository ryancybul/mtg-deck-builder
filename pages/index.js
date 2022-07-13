import { useState } from "react";
import Head from "next/head";
import Card from "../components/Card";
import CardSearch from "../components/CardSearch";
import SetsSearch from "../components/SetsSearch";
import styled from "styled-components";

export default function Home() {
  const [cards, setCards] = useState();
  console.log({ cards });

  return (
    <PageWrapper>
      <Head>
        <title>Card Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SetsSearch setCards={setCards} />
      <CardSearch setCards={setCards} />
      <CardsWrapper>
        {cards && cards.data.map((card) => <Card card={card} />)}
      </CardsWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  width: 100vw;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
