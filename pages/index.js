import { useState } from "react";
import Head from "next/head";
import Card from "../components/Card";
import CardSearch from "../components/CardSearch";
import SetsSearch from "../components/SetsSearch";
import Pagination from "../components/Pagination";
import styled from "styled-components";

export default function Home() {
  const [cards, setCards] = useState(null);
  const [pagUrls, setPagUrls] = useState([]);
  console.log({ cards });
  console.log({ pagUrls });

  return (
    <PageWrapper>
      <Head>
        <title>Card Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchStyles>
        <SetsSearch setCards={setCards} setPagUrls={setPagUrls} />
        <CardSearch setCards={setCards} />
      </SearchStyles>
      <CardsWrapper>
        {cards && cards.data.map((card) => <Card card={card} key={card.id} />)}
      </CardsWrapper>
      {cards !== null && cards && pagUrls.length >= 1 ? (
        <Pagination
          cards={cards}
          setPagUrls={setPagUrls}
          pagUrls={pagUrls}
          setCards={setCards}
        />
      ) : (
        ""
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const SearchStyles = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(109, 69, 171, 1) 50%,
    rgba(5, 80, 96, 1) 100%
  );
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  div {
    padding: 10px;
  }
`;
